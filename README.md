# Music Meta

An application that allows users to record and store meta data for songs, projects, and tracks as they are being written, recorded, and delivered from the ground up.

## Setup

### Main Dependencies

1. [Node](http://nodejs.org) (`node`) - See version in [`.tool-versions`](./.tool-versions)

   - This project is setup to use [asdf](https://github.com/asdf-vm/asdf).
     This allows installing a specific version for the project.
     To install nodejs with asdf, see [https://github.com/asdf-vm/asdf-nodejs](https://github.com/asdf-vm/asdf-nodejs)

   - If using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to set a compatible version based on the project [.nvmrc](./.nvmrc)

1. [Yarn](https://yarnpkg.com/lang/en/) (`yarn`) version 3.5.1
   - This project is setup to use [asdf](https://github.com/asdf-vm/asdf).
     This allows installing a specific version for the project.
     To install yarn with asdf, see [https://github.com/twuni/asdf-yarn](https://github.com/twuni/asdf-yarn)

   - Or install globally via npm: `npm i -g yarn`

   - Or install globally via Homebrew: `brew install yarn`

   - The correct version of yarn has been committed to this repo (in [.yarn](./.yarn/releases)).
     As long as node is installed and a version of yarn is available on the system, this should "just work" and use the project version.
     If there are any issues, or the version needs to be updated, follow the steps below.

   - Set the version for the project ie: `yarn set version 3.5.1`

1. [Git](https://git-scm.com/) (`git`)

Download and install the main dependencies for your specific environment.

### Initial Environment Setup

1. Optional - Install [windows-build-tools](https://www.npmjs.com/package/windows-build-tools) for windows environment only.

    `yarn global add windows-build-tools`

## Running

### Local Development Server

1. Open a terminal in project root.
1. Run `yarn` - Required only when installing packages.
1. Run `yarn dev` this will boot up the local development server.
1. On success, you can view the website in any browser at `http://localhost:3000/`
    - It will open automatically in your default browser

## Custom Tasks

### Generating Component from Templates

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
