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

&#x20; fields: \[],

&#x20; publicUrl,

&#x20; createdAt

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

