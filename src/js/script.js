const btnBuscaPorCep = document.getElementById("btn-busca-cep");
    btnBuscaPorCep.addEventListener("click", (event) => {
        btnBuscaPorCep.classList.add("active");
        btnBuscaPorEnreco.classList.remove("active");
        document.getElementById("search-box-endereco").classList.add("hide");
        document.getElementById("search-box-cep").classList.remove("hide");
});

const btnBuscaPorEnreco = document.getElementById("btn-busca-endereco");
    btnBuscaPorEnreco.addEventListener("click", (event) => {
        btnBuscaPorEnreco.classList.add("active");
        btnBuscaPorCep.classList.remove("active");
        document.getElementById("search-box-cep").classList.add("hide");
        document.getElementById("search-box-endereco").classList.remove("hide");
    });

document.getElementById("cep").addEventListener("input", (event) => {
    cep = event.target.value.replace(/\D/g, "");
    event.target.value = cep;
});

const buscarCep = document.getElementById("buscar-cep").addEventListener("click", async (event) => {

    if(!cep) {
        return showAlert(`Você precisa digitar um CEP...`);
    };

    if (!/^\d{8}$/.test(cep)) {
        return showAlert("Digite um CEP válido com 8 números...");
    };

    try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    
    if (data.erro) {
        return showAlert("CEP não encontrado. Tente outro.");
    };

    document.getElementById("search-box-cep").classList.add("hide");
    document.getElementById("result-container").classList.remove("hide");
    document.getElementById("btn-busca-cep").classList.add("hide");
    document.getElementById("btn-busca-endereco").classList.add("hide");

    document.getElementById("logradouro-result").innerHTML = data.logradouro || "Não disponível.";
    document.getElementById("bairro").innerHTML = data.bairro || "Não disponível.";
    document.getElementById("localidade").innerHTML = `${data.localidade}/${data.uf}` || "Não disponível.";
    document.getElementById("cep-result").innerHTML = data.cep || "Não disponível.";

    showAlert("");
    } catch(error) {
        showAlert("Erro ao buscar CEP. Tente novamente.");
    }

});

const buscarEndereco = document.getElementById("buscar-endereco").addEventListener("click", async (event) => {
    const uf = document.getElementById("uf").value;
    const cidade = document.getElementById("cidade").value;
    const logradouro = document.getElementById("logradouro").value;

    if (!uf || !cidade || !logradouro) {
        return showAlert("Por favor preencha todos os campos...")
    };

    try {
        const response = await fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json/`);
        if (!response.ok) {
            return showAlert("Endereço não encontrado. Tente novamente.");
        };
        const data = await response.json();
    
        document.getElementById("logradouro-result").innerHTML = data[0].logradouro || "Não disponível.";
        document.getElementById("bairro").innerHTML = data[0].bairro || "Não disponível.";
        document.getElementById("localidade").innerHTML = data[0].localidade + "/" + data[0].uf || "Não disponível.";
        document.getElementById("cep-result").innerHTML = data[0].cep || "Não disponível.";

        document.getElementById("search-box-endereco").classList.add("hide");
        document.getElementById("result-container").classList.remove("hide");
        document.getElementById("btn-busca-cep").classList.add("hide");
        document.getElementById("btn-busca-endereco").classList.add("hide");
    
        showAlert("");
    } catch(error) {
        showAlert("Erro ao buscar o endereço. Tente novamente.");
    }
});

const novaBuscar = document.getElementById("nova-busca").addEventListener("click", (event) => {
    if(btnBuscaPorCep.classList.contains("active")) {
        document.getElementById("search-box-cep").classList.remove("hide");
    } else {
        document.getElementById("search-box-endereco").classList.remove("hide")
    }
    document.getElementById("result-container").classList.add("hide");
    document.getElementById("btn-busca-cep").classList.remove("hide")
    document.getElementById("btn-busca-endereco").classList.remove("hide")

    document.getElementById("cep").value = "";
    cep = "";

    document.getElementById("uf").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("logradouro").value = "";

    document.getElementById("logradouro-result").innerText = "";
    document.getElementById("bairro").innerText = "";
    document.getElementById("localidade").innerText = "";
    document.getElementById("cep-result").innerText = "";

    showAlert("");
});

function showAlert(message) {
    document.getElementById("alert").innerHTML = message;
};