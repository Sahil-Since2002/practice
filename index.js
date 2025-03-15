const express =  require("express");
const users= require("./MOCK_DATA.json")
const app=express();
const PORT=8000;
//Routes

//For HTML Website's
app.get('/users', (req,res) => {
   const html=`<ul>${users.map((user) => `<li>${user.first_name}</li>`).join("")}</ul>`;
   res.send(html);
})

//GET API for All users
app.get('/api/users',(req,res) => {
    return res.json(users);
})

//Get Api with ID for Single user
app.get("/api/users/:id",(req,res) => {
    const id=Number(req.params.id);
    const user=users.find(user => user.id === id);
    return res.json(user);
})


app.use(express.urlencoded({extended: false}));
//Post Api's
// app.post("/api/users",(req,res) =>{
//     const body=req.body;
//     console.log('Body',body);
//     return res.json({status: "Pending"});
// });



app.post("/api/users", (req, res) => {
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
        return res.status(400).json({ error: "Invalid request, body is required" });
    }

    console.log('Body:', body);
    return res.status(201).json({ status: "Success", data: body });
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`))
