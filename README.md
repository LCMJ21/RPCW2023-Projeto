# Website de Acordãos

Realizado por:

- Cristiano Pereira - PG50304
- João Martins - PG
- Jorge Lima - PG50506

---

## Introdução

No âmbito da unidade curricular *Representação e Processamento de Conhecimento na Web*, foi desenvolvido este projeto, que consiste num website de Acórdãos, onde os dados utilizados foram fornecidos pelo professor e processados pelo grupo para o desenvolvimento do website. No desenvolvimento deste projeto, foram utilizados os conhecimentos adquiridos tanto em *JavaScript*, como também bibliotecas amplamente utilizadas, e no software de base de dados *MongoDB*.

## Como executar



## base de dados


## Features do website

Após ter consruido a base de dados, o grupo desenvolveu um website que permite a visualização dos dados da base de dados, bem como a sua manipulação. O website é contém as seguintes funcionalidades:
### Login

O website contém um sistema de login, permitindo que apenas utilizadores registados possam aceder ao website. O website contém um sistema de autenticação, que verifica se o utilizador está registado, e se a password está correta. Caso o utilizador não esteja registado, ou a password esteja incorreta, o utilizador não consegue aceder ao website.

![Página de login](images/login.png)

### Registo

Caso o utilizador não esteja registado, o website permite que o utilizador se registe, fornecendo os seus dados, como o nome, email, password, .... O website contém um sistema de validação de dados, que verifica se os dados fornecidos pelo utilizador são válidos, e caso não sejam, o utilizador não consegue registar-se.

![Página de registo](images/register.png)

### Cabeçalho e rodapé

O website contém um cabeçalho e um rodapé, que estão presentes em todas as páginas do website.
O cabeçalho contém o logo do website e links para algumas paginas, o nivel de acesso do utilizador e um botão que permite terminar a sessão.
O rodapé contém o nome dos autores do website e outros links que podem ser de uso.


### Página inicial

A Homepage do website contém  um sistema de pesquisa, que permite ao utilizador pesquisar por acórdãos, e filtrar os resultados da pesquisa. A tabela contém os dados dos acórdãos, e permite ao utilizador vizualizar o acordão, adicionar acordãos aos seus favoritos, editar os dados dos acórdãos, bem como apagar os acórdãos.

Estas operações são reservadas apenas a utilizadores de determinado nivel

- Utilizadores com nivel de acesso Consumidor podem apenas vizualizar e adicionar aos seus favoritos os acórdãos.

- Utilizadores com nivel de acesso Produtor podem vizualizar, adicionar aos seus favoritos, editar e adicionar os acórdãos.

- Utilizadores com nivel de acesso Administrador podem vizualizar, adicionar aos seus favoritos, editar, apagar e adicionar acórdãos.

![Página inicial](images/homepage.png)

A tabela também contém um sistema de paginação, que permite ao utilizador navegar entre as páginas da tabela.

![Paginação](images/pag.png)


### Página do utilizador

A página do utilizador contém os dados do utilizador, bem como a mesma tabela da homepage com os acórdãos favoritos do utilizador. O utilizador vizualizar os seus dados e pode seguir para a página de edição dos seus dados.

![Página do utilizador](images/userPage.png)

### Página de edição de dados do utilizador

A página de edição de dados do utilizador permite ao utilizador editar os seus dados, como o nome, email, username, ...
![Editar utilizador](images/editUser.png)


### Página de alteração de permissões

A página de alteração de permissões permite ao utilizador com nivel de acesso Administrador alterar o nivel de acesso de outros utilizadores.

![Página de alteração de permissões](images/permissions.png)

### Página de visualização de acórdãos

A página de visualização de acórdãos permite ao utilizador vizualizar os dados de um acórdão, bem como adicionar o acórdão aos seus favoritos.

![Página de visualização de acórdãos](images/viewAcordao.png)

### Página de adição de acórdãos

A página de adição de acórdãos permite ao utilizador com nivel de acesso Produtor adicionar acórdãos à base de dados.

![Página de adição de acórdãos](images/addAcordao.png)

É totalmente dinamica, e permite ao utilizador adicionar que campos considerar necessários.

![Página de adição de acórdãos2](images/addAcordao2.png)

Ela contém um sistema de validação de dados, que verifica se os dados fornecidos pelo utilizador são válidos, e caso não sejam, o utilizador não consegue adicionar o acórdão.

![Página de adição de acórdãos erro](images/addAcordaoError.png)

### Página de edição de acórdãos

A página de edição de acórdãos permite ao utilizador com nivel de acesso Produtor editar os acórdãos da base de dados. É muito similar à página de adição de acórdãos, mas já vem com os dados pré-preenchidos.

![Página de edição de acórdãos](images/editAcordao.png)
