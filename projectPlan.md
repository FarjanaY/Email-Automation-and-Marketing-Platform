###### ***User Side***

Authentication

Dashboard

Form Builder

Form Submission

Subscriber Management

Email Automation

Basic CRM

Payment gateway



###### ***Admin Side***

User Management

Analytics



###### ***DevOps***

&#x20;GitHub

&#x20;Docker

&#x20;Deployment



###### ***Project Structure***

email-automation-platform/

&#x20;frontend/

&#x20;├── src/

&#x20;│   ├── pages/

&#x20;│   ├── components/

&#x20;│   ├── layouts/

&#x20;│   ├── hooks/

&#x20;│   ├── services/

&#x20;│   ├── routes/

&#x20;│   └── context/



&#x20;backend/

&#x20;├── src/

&#x20;│   ├── controllers/

&#x20;│   ├── services/

&#x20;│   ├── routes/

&#x20;│   ├── middlewares/

&#x20;│   ├── models/

&#x20;│   ├── utils/

&#x20;│   └── config/



&#x20;docker/

&#x20;├── frontend.Dockerfile

&#x20;├── backend.Dockerfile

&#x20;└── docker-compose.yml

&#x20;



###### ***Database***



***Users***

{

&#x20; \_id,

&#x20; name,

&#x20; email,

&#x20; password,

&#x20; role,

&#x20; plan,

&#x20; createdAt

}





***Forms***

{

&#x20; title,

&#x20; userId,



&#x09;

&#x20; fields: \[],

&#x20; urlName,

&#x20; publicUrl,

&#x20; createdAt

}

(example for creating in backend: const publicUrl = `${process.env.FRONTEND\\\_URL}/form/${form.urlName}`;)

Option 2



***Store a random public URL string.***



***Install:***



npm install nanoid



***Schema:***



publicUrl: {

&#x20; type: String,

&#x20; unique: true,

}



***Before save:***



const { nanoid } = require("nanoid");



formSchema.pre("save", async function (next) {

&#x20; if (!this.publicUrl) {

&#x20;   this.publicUrl = nanoid(10);

&#x20; }



&#x20; next();

});



***Example:***



{

&#x20; "publicUrl": "A7x91LmQzP"

}



***Frontend URL:***



https://yourdomain.com/form/A7x91LmQzP



***Route:***



router.get("/form/:publicUrl", getPublicForm);



***Controller:***



const form = await Form.findOne({

&#x20; publicUrl: req.params.publicUrl,

});

***Use both slug and a random ID.***
---



***Example:***



newsletter-form-3fa8d2



***Install:***



npm install slugify nanoid



***Pre-save middleware:***



const slugify = require("slugify");

const { nanoid } = require("nanoid");



formSchema.pre("save", async function (next) {

&#x20; if (!this.slug) {

&#x20;   this.slug =

&#x20;     slugify(this.titlename, {

&#x20;       lower: true,

&#x20;       strict: true,

&#x20;     }) +

&#x20;     "-" +

&#x20;     nanoid(6);

&#x20; }



&#x20; next();

});



***Generated:***



newsletter-form-k3h82x



***Public URL:***



https://yourdomain.com/form/newsletter-form-k3h82x





&#x20;***createdBy: {***

&#x20; ***type: mongoose.Schema.Types.ObjectId,***

&#x20; ***ref: "User",***

&#x20; ***required: true,***

***}***

***Create Form***

const Form = require("../models/Form");



&#x09;const createForm = async (req, res) => {

&#x20;	 const form = await Form.create({

&#x20; 	  titlename: req.body.titlename,



&#x20;   	 createdBy: req.user.id,

&#x20; 	});



&#x20;	 res.status(201).json(form);

&#x09;};



***Step 4: Get User Information***



Suppose you want all forms with their creator info.



***Use:***



const forms = await Form.find()

&#x20; .populate("createdBy");

Result:



\[

&#x20; {

&#x20;   "\_id": "123456",

&#x20;   "titlename": "Newsletter Form",

&#x20;   " createdBy": {

&#x20;     "\_id": "6843b90a7d2f9a1234567890",

&#x20;     "name": "Shakib",

&#x20;     "email": "test@gmail.com"

&#x20;   }

&#x20; }

]



***Without populate():***



{

&#x20; " createdBy": "6843b90a7d2f9a1234567890"

}



***With populate():***



{

&#x20; " createdBy": {

&#x20;   "\_id": "...",

&#x20;   "name": "...",

&#x20;   "email": "..."

&#x20; }

}



***Subscribers***

{

&#x20; formId,

&#x20; name,

&#x20; email,

&#x20; phone,

&#x20; status,

&#x20; tags,

&#x20; notes

}



***Campaigns***

{

&#x20; userId,

&#x20; subject,

&#x20; content,

&#x20; subscribers,

&#x20; status

}



***Activities***

{

&#x20; subscriberId,

&#x20; action,

&#x20; createdAt

}

