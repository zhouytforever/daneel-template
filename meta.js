module.exports = {
  "helpers": {
    "if_or": function (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    }
  },
  "prompts": {
    "entity": {
      "type": "string",
      "required": true,
      "message": "Your entity variable name"
    },
		"name": {
      "type": "string",
      "required": true,
      "message": "Your entity's property name for label (e.g 姓名)"
		},
		"property": {
      "type": "string",
      "required": true,
      "message": "Your entity's property variable (e.g name)"
		},
    "continue": {
      "type": "confirm",
      "message": "Continue another one property ?"
    },
	},
  "completeMessage": "To get start:\n\n1. Config the CURD api path in {{^inPlace}}/module/api.js\n\n2. Add the menu and other config for this module."
};
