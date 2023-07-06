export default function handler(req, res) {
    console.log("I'm in the API Route");
    const { lastName, key } = req.body;
    
    console.log(lastName);
    console.log(key);

    res.status(200).json({ result: `Your last name ${lastName} is awesome!`});
}