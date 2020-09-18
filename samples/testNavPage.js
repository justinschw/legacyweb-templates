const LegacyWebNavPage = require('../index');

port = 8080

const sampleNavPage = {
  title: 'Page Title',
    header: {
			type: 'text',
			text: 'Welcome to Page'
	},
	nav: [
		{
	    text: 'link1',
	    href: 'link1'
		},
		{
	    text: 'link2',
	    href: 'link2'
		}
  ]
};

const indexGet = {
  route: 'index',
  method: 'get',
  parts: [
	  {
	    type: 'form',
	    action: '/',
	    inputs: [
	    	{
					type: 'text',
					id: 'name',
					length: 75,
					label: 'Name',
					value: ''
				},
				{
					type: 'submit',
					length:50,
					label: 'OK'
				}
	    ]
		},
		{
				type: 'paragraph',
				text: 'Welcome to the index page. You can enter your name above.'
		},
		{
				type: 'generated',
				content: function(req) {
					text = 'This is generated text';
					return text;
				}
		}
  ]
};

const indexPost = {
  route: 'index',
  method: 'post',
  parts: [
    {
      type: 'generated',
      content: function(req) {
        text = `Hello ${req.body.name}`;
        return text;
      }
    }
  ]
};

const link1Get = {
    route: 'link1',
    method: 'get',
    parts: [
			{
				type: 'paragraph',
				text: 'This is page 1'
			}
    ]
};

const link2Get = {
    route: 'link2',
    method: 'get',
    parts: [
			{
				type: 'paragraph',
				text: 'This is page 2'
			}
    ]
};

const navPageExample = new LegacyWebNavPage();

navPageExample.addGet('/', sampleNavPage, indexGet);
navPageExample.addPost('/', sampleNavPage, indexPost);
navPageExample.addGet('/link1', sampleNavPage, link1Get);
navPageExample.addGet('/link2', sampleNavPage, link2Get);

navPageExample.startServer(port);
