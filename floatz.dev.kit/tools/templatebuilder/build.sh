#!/bin/bash

mustache config.json index.mustache > index.html
mustache config.json demo.css.mustache > styles/demo.css
mustache config.json demo.js.mustache > scripts/demo.js