module.exports = {
  "env": {
    "browser": true,
    "node": true
  },
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "rules": {
    "no-param-reassign": ["error", {
      "props": false
    }],
    'jsx-a11y/no-static-element-interactions': 0,
    'react/forbid-prop-types': 0,
    "import/no-unresolved": [
      "error",
      {
        "ignore": ['./src']
      }
    ]
  }
};
