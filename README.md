# Music Meta

An application that allows users to record and store meta data for songs, projects, and tracks as they are being written, recorded, and delivered from the ground up.

## Setup

### Main Dependencies

1. [Node](http://nodejs.org) (`node`) - at least version 8.6, no higher than 9.0
1. [Yarn](https://yarnpkg.com/lang/en/) (`yarn`)
1. [Git](https://git-scm.com/) (`git`)

Download and install main dependencies for your specific environment.

### Initial Environment Setup

1. Optional - Install windows-build-tools for windows environment only.

    `npm i -g windows-build-tools`

## Running

### Local Devlopment Server

1. Open a terminal in project root.
1. Run `yarn` - Required only when installing packages.
1. Run `yarn dev` this will bootup the local devlopment server.
1. On success, you can view the website in any browser at `http://localhost:3333/`
    - It will open automatically in your default browser

## Custom Tasks

### Generating Componenent from Templates

1. Open a terminal and jump to project folder.
1. Run `yarn gc`
1. Select `y` when asked to choose for custom template.
1. Choose component template for your need
    - We currently have templates for:
        - ts-component, a general purpose React component that extends the PureComponent.
        - ts-SFComponent, a general purpose React component that doesn't extend.
1. Provide component name and hit return.
    - This will create component inside root/src/components.

### Unit Testing

1. Run `yarn test:coverage`
    - This will run all the unit tests in the app, show the results of each, and generate a table showing the code coverage of the tests.
1. Run `yarn test -u`
    - This will initially run all the unit tests in the app and show the results of each.
    - It will then present a menu of choices.
        - Press "p" and type in the name of a specific unit test to run just that test. When that test is run, it is "watched"; any code change to the files related to the test will cause the test to rerun.

### Building the app for deployment

1. Run `yarn build`
    - This will create a folder in the root of the project called "build".
    - This is the folder that gets deployed.

### Standard Development Practice

1. When creating a new component, please try to use an available template.
1. Initially create Unit Tests that fulfill the requirements.
1. Build the component to satisfy the Unit Tests. Get as close to 100% coverage as possible.
1. Commit to your feature branch often!
1. Before making a pull request ensure that:
    - The code has been linted and any warnings and errors dealt with.
    - `yarn build` has been run to ensure that the build will not fail CI/CD.
