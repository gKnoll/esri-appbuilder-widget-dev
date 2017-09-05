module.exports =
{
	"extends": "eslint:recommended",
	"parserOptions": {
    "ecmaVersion": 5,
    "sourceType": "script"
  },
	'globals': {
		"define": false,
    "require": false,
    '$': false,
		"console": false,
		"window": true,
		"document": true
  },
	rules: {
		//unused arguments and such are now warnings not errors
		"no-unused-vars": [1, {"vars": "local", "args": "none"}],
		//allow console usage. in a production build disable?
		"no-console": "off"
	}

}
