# So what is this app

__A full stack blog built with React frontend and SpringBoot API as the back end and a MySQL db__

#### Flashy words: 

Hibernate Envers, Redux, Webpack, Typescipt, Javacript, Java, React, SpringBoot API, 
_Determination_, JSON, JWT, RBAC, Micro-Frontend, React-Admin, _Persistence_, TinyMce, Material UI

#### Architecture:
Follows(at least it should) a generic [layered/tiered model](https://en.wikipedia.org/wiki/Multitier_architecture): 

__Presentation__ -> __Business__ -> __Services__ -> __Persistence__ -> __Database__

#### Database:
Utilizes a MySQL DB, nothing too fancy, some relationships are maintained

#### BackEnd:
* Authentication via JSON Web Token
* Authorization(via role based access control...but not really)
* Audditing provided by hibernate envers


#### FrontEnd:
* Utilizes Webpack
* Material UI for components...cause why rebuild stuff
* [TinyMce](https://www.tiny.cloud/) is the editor of choice
* [React-Admin](https://marmelab.com/react-admin/)(a framework utlizig React, Material UI, React Router, Redux, and React-Final-Form to present a unified admin framework)
* Redux to manage state
* MicroFrontend implemented by the [ModuleFederationPlugin](https://webpack.js.org/plugins/module-federation-plugin/)



#### Testing:
To be honest I really should start testing my code...if you want to call me a hypocrite because of this I understand

	
#### Deployment:
Slow you're roll buddy...we aren't there...yet...

# Demo
...not sure if I'll regularly update this readme but clearly you can see that I have a vague sense of what I'm doing...you want to see a demo of what I have so far...here take a look

![](https://github.com/quipcode/gif_halla/blob/main/demo.gif)

# The Journey
* __Started in July '21:__
    * as a basic idea to help me read/write simple post
    * mostly spent this month writing simply routes to make sure I can write APIs
    * struggled implementing tinymce editor into my front end
    * struggled configuring backend properties
*__August:__
	* Finally able to write to and read from my MySQL Database
	* Added Hibernate Envers to enable auditing
	* Beefed up my APIs to allow full CRUD operations
	* Started having a [rough idea](https://github.com/quipcode/halla/wiki) of what I want the app to look like
* __September:__
	* Worked out some kinks in my API
	* Started some more customization of my frontend
	* Tried getting Parent/Child relation to work
	* Flesh out frontend to consume and interact with backend API utilizing redux
* __October:__
	* Spent more time refining the frontend to allow for a more seemless and intuitive interaction
	* Had the 'great' idea to have 'sections' to my content/article
	* Had the even 'greater' idea of incorporating react-admin into my frontend to spend less time implementing an admin app
	* Struggled and failed to implement my own custom [<Admin/> compenent](https://marmelab.com/react-admin/CustomApp.html#not-using-the-admin-components)
* __November:__
	* Created react-admin branch and was able to get a basic react-admin frontend up and running
	* Spent a good 2 weeks getting react-admin to look more like what I needed it to be...some may say I'm still spending time
	* Realized having a vague 'content' API is not helpful...as content can be video, photo, etc...realized blogs have 'articles' hence created an article endpoint
	* Started getting disgusted by how bloated my frontend was looking, and I really dislike how react-admin implements its own store, router...its basically its own app...so brilliant me starts looking into fracturing my app into an admin side and 'client'(for non-registered user for basic content consumption i.e. just Read access)
	* Created the 'container' branch and worked through getting different apps to talk to one another
	* Also had the brilliant idea of making my front-end by strongly-typed...and so began my foray into Typescript...its not bad...but its just painfully annoying