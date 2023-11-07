//instalando programas
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");


//configurando o roteamento para teste no postman
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;


//configurando o acesso ao mongodb
mongoose.connect('mongodb://127.0.0.1:27017/bikeworld',
{   useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS : 20000
});


//criando a model do seu projeto
const usuarioSchema = new mongoose.Schema({
    email : {type : String, required : true},
    senha : {type : String}
});


const Usuario = mongoose.model("usuario", usuarioSchema);


//configurando os roteamentos
app.post("/cadastrousuario", async(req, res)=>{
    const email = req.body.email;
    const senha = req.body.senha
    
    


    const usuario = new Usuario({
        email : email,
        senha : senha  
    })


    try{
        const newusuario = await usuario.save();
        res.json({error : null, msg : "Cadastro ok", usuarioId : newusuario._id});
    } catch(error){
        res.status(400).json({error});
    }

});
//criando a model do seu projeto
const produtobicicletaSchema = new mongoose.Schema({
    id_produtobicicleta : {type : String, required : true},
    Descricao : {type : String},
    Marca : { type : String},
    Datafabricacao : {type : Date},
    Quantidadeestoque : {type : Number, required : true}
});


const Produtobicicleta = mongoose.model("produtobicicleta", produtobicicletaSchema);


//configurando os roteamentos
app.post("/cadastroprodutobicicleta", async(req, res)=>{
    const id_produtobicicleta = req.body.id_produtobicicleta;
    const Descricao = req.body.Descricao;
    const Marca = req.body.Marca;
    const Datafabricacao = req.body.Datafabricacao;
    const Quantidadeestoque  = req.body.Quantidadeestoque
    


    const produtobicicleta = new Produtobicicleta({
        id_produtobicicleta : id_produtobicicleta,
        Descricao : Descricao,
        Marca : Marca,
        Datafabricacao : Datafabricacao,
        Quantidadeestoque : Quantidadeestoque
        
    })


    try{
        const newprodutobicicleta = await produtobicicleta.save();
        res.json({error : null, msg : "Cadastro ok", produtobicicletaId : newprodutobicicleta._id});
    } catch(error){
        res.status(400).json({error});
    }


});

app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
})

try{
    const newPessoa = await pessoa.save();
    res.json({error : null, msg : "Cadastro ok", pessoaId : newPessoa._id});
} catch(error){
    res.status(400).json({error});
}
;

//rota para o get de cadastro
app.get("/cadastropessoa", async(req, res)=>{
res.sendFile(__dirname +"/cadastrousuario.html");
});




//rota raiz - inw
app.get("/", async(req, res)=>{
res.sendFile(__dirname +"/cadastrousuario.html");
});




//configurando a porta
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})


        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', async function (event) {
                event.preventDefault();
                const formData = new FormData(form);
                const endpoint = form.action;

                // Verifique se todos os campos estão preenchidos
                let isFormValid = true;
                formData.forEach((value, key) => {
                    if (!value) {
                        alert(`Preencha o campo "${key}"`);
                        isFormValid = false;
                    }
                });

                if (!isFormValid) {
                    return;
                }

                // Envie os dados para o servidor
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Object.fromEntries(formData))
                });

                if (response.ok) {
                    alert('Cadastro realizado com sucesso!');
                } else {
                    const data = await response.json();
                    alert('Erro: ' + data.error);
                }
            });
        });
   