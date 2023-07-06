import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { PineconeClient } from "@pinecone-database/pinecone";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { CharacterTextSplitter } from "langchain/text_splitter";

// Example: https://js.langchain.com/docs/modules/indexes/document_loaders/examples/file_loaders/pdf
export default async function handler(req, res) {
  if (req.method === "GET") {
    console.log("Inside the PDF handler");
    
    /** STEP ONE: LOAD DOCUMENT */
    const bookPath = "/Users/nwar/openai-javascript-course/data/document_loaders/naval-ravikant-book.pdf";
    const loader = new PDFLoader(bookPath);

    const docs = await loader.load();

    console.log(docs);

    if (docs.length === 0) {
      console.log("No docs found");
      return;
    }

    // Chunk it
    const splitter = new CharacterTextSplitter({
      separator: " ",
      chunkSize: 250,
      chunkOverlap: 10,
    });

    const splitDocs = await splitter.splitDocuments(docs);

    // Reduce the size of the metadata
    const reduceDocs = splitDocs.map((doc) => {
      const reduceMetadata = { ...doc.metadata };
      delete reduceMetadata.pdf;
      return new Document({
        pageContent: doc.pageContent,
        metadata: reduceMetadata,
      });
    });

    console.log(reduceDocs[0]);
    console.log(splitDocs.length);

    /** STEP TWO: UPLOAD TO DATABASE */

    //Initialize Pinecone
    const client = new PineconeClient();

    await client.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
    });

    const pineconeIndex = client.Index(process.env.PINECONE_INDEX);
    // upload documents to Pinecone

    await PineconeStore.fromDocuments(reduceDocs, new OpenAIEmbeddings(), {
      pineconeIndex,
    });

      console.log("Successfully uploaded to Vector Database!");
    // Modify output as needed
    return res.status(200).json({ result: docs });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
