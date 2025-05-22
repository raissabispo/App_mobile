


# 🚀 NASA Image Search - React Native

Aplicativo React Native para buscar imagens da NASA, visualizar detalhes e salvar favoritos localmente.

---

## ✨ Funcionalidades

- 🔍 Buscar imagens da NASA por palavra-chave (ex: galaxy, nebula, stars)
- 🖼️ Exibir resultados em uma lista com título, descrição e imagem
- 📄 Visualizar detalhes de cada imagem (em outra tela)
- ⭐ Marcar/desmarcar imagens como favoritas
- 💾 Salvar favoritos localmente usando AsyncStorage
- 🔔 Alertas para ações de adicionar/remover favoritos

---

## 🛠️ Tecnologias utilizadas

- ⚛️ React Native
- 📡 Axios (para requisições HTTP)
- 🗄️ AsyncStorage (armazenamento local)
- 🎨 react-native-vector-icons (ícones)
- 🌌 API NASA Images ([https://images-api.nasa.gov/](https://images-api.nasa.gov/))

---

## ⚙️ Como usar

### 📋 Pré-requisitos

- 💻 Node.js instalado
- 📱 Ambiente React Native configurado (Expo ou React Native CLI)
- 📟 Emulador Android/iOS ou dispositivo físico

### 📝 Passos

1. Clone o repositório:

   ```bash
   git clone https://github.com/raissabispo/App_mobile.git


2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Instale a dependência de ícones:

   ```bash
   npm install react-native-vector-icons
   ```

4. Execute o projeto:

   ```bash
   npx react-native run-android
   # ou
   npx react-native run-ios
   ```

---

## 📂 Estrutura do código principal

* 🏠 `HomeScreen` é o componente principal
* ⚙️ Usa `useState` para estado de busca, resultados e favoritos
* 🔄 Usa `useEffect` para carregar favoritos ao iniciar
* 🔍 Funções para buscar imagens na API da NASA
* 💾 Funções para salvar e carregar favoritos no AsyncStorage
* 📃 Lista resultados com `FlatList`, permitindo navegação e marcar favoritos

---

## 🎨 Customização

* ✏️ Alterar placeholder da busca em `TextInput`
* 🎨 Ajustar estilos em `StyleSheet`
* ➕ Expandir funcionalidades, como adicionar tela de detalhes (já prevista na navegação)

---

## 📬 Contato

Qualquer dúvida ou sugestão, abra uma issue no repositório ou entre em contato.

---

Feito com ♥ por Raissa Bispo

```
