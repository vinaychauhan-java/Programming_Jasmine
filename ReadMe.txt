# Check the Node & NPM version
npm -v
node -v

# Install the required dependencies
npm install karma --save-dev
npm install jasmine-core karma-jasmine --save-dev
npm install karma-jasmine-matchers --save-dev
npm install puppeteer --save-dev     [Used for Google Chrome Headless Browser]
npm install karma-chrome-launcher --save-dev
npm install istanbul --save-dev      [Used for Reporting]
npm install karma-cli --save-dev
npm install karma-coverage --save-dev