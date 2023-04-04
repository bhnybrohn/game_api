//GET /api/games - to get all games
//POST /api/games - to create a new game
//GET /api/games/:id - to get a specific game
//PUT /api/games/:id - to update a specific game
//DELETE /api/games/:id - to delete a specific game
//Users Data:
//GET /api/users - to get all users
//POST /api/users - to create a new user
//GET /api/users/:id - to get a specific user
//PUT /api/users/:id - to update a specific user
//DELETE /api/users/:id - to delete a specific user

const db  = require('./db')
const express = require('express')
const app = express()
db()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { userSchema, gameSchema } = require('./schemas')
app.post('/api/game', async function (req, res) {
   const { name, category } = req.body
    try{
       const check_game = await gameSchema.findOne({name})
        if(check_game){
          return res.json({
              "message":"game already exists"
          })
        }
       const new_game = await gameSchema.create({
           name, category
       })
        if(new_game){
       return     res.status(201).json({
                "success": true,
                "message":"new game created",
                "data": new_game
            })
        }
   }catch (e) {
     res.status(500).json({
         success: false,
         message:" an error occured",
         error:e.message
     })
    }
})

app.get("/api/game/:id", async(req, res)=>{
    try{
        const check_game = await gameSchema.findOne({_id:req.params.id})
        if(!check_game){
            return res.json({
                "message":"game  does not  exists"
            })
        }
        if(check_game){
            return res.status(201).json({
                "success": true,
                "message":"new game found",
                "data": check_game
            })
        }
    }catch (e) {
        res.status(500).json({
            success: false,
            message:" an error occured",
            error:e.message
        })
    }
})

app.get('/api/game', async function (req, res) {
      const { page, limit } = req.query;
try{

      const data = await gameSchema.find().sort({ createdAt: -1 })
                    .limit(limit * 1)
                    .skip((page - 1) * limit)
                    .exec();

      const count = await gameSchema.countDocuments()

                return res.status(200).json({
                    success: true,
                    message: "Data Retrieved",
                    data,
                    items_returned: data.length,
                    totalPages: Math.ceil(count / limit),
                    currentPage: page,

                });

            } catch (error) {
                res.send({
                    success: false,
                    message: error.message,

                });
            }

})

app.put("/api/game/:id", async(req, res)=>{

    try{
        const {name, category} = req.body
        const check_game = await gameSchema.findOne({_id:req.params.id})
        check_game.name = name || check_game.name
        check_game.category = category || category.category
        check_game.save()


        return res.status(201).json({
            "success": true,
            "message":"new game found",
            "data": check_game
        })


    }catch (e) {
        res.status(500).json({
            success: false,
            message:" an error occured",
            error:e.message
        })
    }


})

app.delete("/api/game/:id", async(req, res)=>{

    try{
       await gameSchema.findByIdAndDelete(req.params.id)
        return res.status(201).json({
            "success": true,
            "message":" game deleted",
        })

    }catch (e) {
        res.status(500).json({
            success: false,
            message:" an error occured",
            error:e.message
        })
    }


})

app.post('/api/user', async function (req, res) {
    const { name, email, address } = req.body
    try{
        const check_user = await userSchema.findOne({name})
        if(check_user){
            return res.json({
                "message":"user already exists"
            })
        }
        const user = await userSchema.create({
            name, email,address
        })
        if(user){
            return     res.status(201).json({
                "success": true,
                "message":"new game created",
                "data": user
            })
        }
    }catch (e) {
        res.status(500).json({
            success: false,
            message:" an error occured",
            error:e.message
        })
    }
})

app.get("/api/user/:id", async(req, res)=>{
    try{
        const user = await userSchema.findOne({_id:req.params.id})
        if(!user){
            return res.json({
                "message":"user does not  exists"
            })
        }
        if(user){
            return res.status(201).json({
                "success": true,
                "message":"new user found",
                "data": user
            })
        }
    }catch (e) {
        res.status(500).json({
            success: false,
            message:" an error occured",
            error:e.message
        })
    }
})

app.get('/api/user', async function (req, res) {
    const { page, limit } = req.query;
    try{

        const data = await userSchema.find().sort({ createdAt: -1 })
                    .limit(limit * 1)
                    .skip((page - 1) * limit)
                    .exec();

        const count = await userSchema.countDocuments()

    return res.status(200).json({
        success: true,
        message: "Data Retrieved",
        data,
        items_returned: data.length,
        totalPages: Math.ceil(count / limit),
        currentPage: page,

    });

    } catch (error) {
        res.send({
            success: false,
            message: error.message,

        });
    }

})

app.put("/api/user/:id", async(req, res)=>{

    try{
        const {name, email, address} = req.body
        const user = await userSchema.findOne({_id:req.params.id})
        user.name = name || user.name
        user.email = email || user.email
        user.address  = address || user.address
        user.save()


        return res.status(201).json({
            "success": true,
            "message":"user edited",
            "data": user
        })


    }catch (e) {
        res.status(500).json({
            success: false,
            message:" an error occured",
            error:e.message
        })
    }


})

app.delete("/api/user/:id", async(req, res)=>{

    try{
        await userSchema.findByIdAndDelete(req.params.id)
        return res.status(201).json({
            "success": true,
            "message":" user deleted",
        })

    }catch (e) {
        res.status(500).json({
            success: false,
            message:" an error occured",
            error:e.message
        })
    }


})
app.get("*", function (req, res) {
    res.status(404).send({ message: " Route, Not found", success: false, status: 404 });
})


const port = process.envd.PORT || 6000
app.listen(port, () => {
    console.log(`starting server on port ${port}`);
});
