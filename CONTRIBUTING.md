# Contributing to GitHub App Authentication Action

Great that you want to help us to make the world a better place :+1:  

The following is a set of guidelines for contributing to the GitHub App Authentication Action.  
Mandatory guidelines are checked automatically on commit and in GitHub Actions.  

- [Code of Conduct](https://www.volkswagenag.com/presence/konzern/documents/Code_of_Conduct_Group_En.pdf)
- [Found an issue](#found-an-issue-or-bug)
- [Missing a feature](#missing-a-feature)
- [Quality Concept](#quality-concept)
- [Commit messages](#commit-messages)


# Found an Issue or Bug?

If you find a bug in the source code, you can contribute by [submitting an issue](https://github.com/volkswagen/github-app-authentication-action/issues/new?assignees=elgohr%2C+tenjaa&labels=bug&template=bug_report.md&title=%5BBUG%5D). If you want to help even more, you can submit a Pull Request with a fix.

Before you submit your issue, please search the existing issues to avoid duplicates.


# Missing a Feature?

You can request a new feature by [submitting an issue](https://github.com/volkswagen/github-app-authentication-action/issues/new?assignees=elgohr%2C+tenjaa&labels=enhancement&template=feature_request.md&title=%5BFEATURE%5D).

For implementing a new feature please consider the kind of change:

- major changes should be discussed an issue that clearly outlines the changes and benefits of the feature
- small changes can directly be contributed as a Pull Request, following the [Quality Concept](#quality-concept)


# Quality Concept

The following section describes how we want to ensure that this repository keeps or improves the quality over time.  
This is also aligned with ISO/IEC 25010.

## Coding

Try to follow the SOLID principles of [clean code](https://medium.com/mindorks/how-to-write-clean-code-lessons-learnt-from-the-clean-code-robert-c-martin-9ffc7aef870c).  

## Testing

To ensure a constant quality and development speed all tests must be implemented and executed automatically.  
In this context tests act as criteria for accepting a feature, which also prevents features from being changed or deleted without a test being red.  
For getting a fast feedback tests must be run before commiting. For making sure that this really happens, GitHub Actions runs tests on every commit.  
In general we would be really happy if you use [TDD](https://en.wikipedia.org/wiki/Test-driven_development) or any other style of [shift left testing](https://snyk.io/learn/shift-left-testing/) for your development.  

In addition the [4-eyes principle](https://ec.europa.eu/eurostat/cros/content/four-eyes-principle_en) must be ensured and documented.  
This is done by using Pull Requests or by using [Co-authored-by](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors) in maintainer pairing.  

Test data in the repository must not contain any personal data.

### Levels of Testing

In general features should be covered in three different ways:  
- [Unit Testing](https://en.wikipedia.org/wiki/Unit_testing)
- [Integration Testing](https://en.wikipedia.org/wiki/Integration_testing)
- [End To End Testing](https://en.wikipedia.org/wiki/System_testing)

#### Unit Testing

This repository is using jest for unit testing.  
In addition a threshold is configured on test coverage to prevent a decrease over time.  

At the moment this repository is at 100% test coverage. In this way the threshold is configured to 100%.  
If you want to change that, please have good reasons for this and discuss it in advance.

#### Integration Testing

This repository consists of only one module, so there's nothing to integration test.  

#### End To End Testing

Every commit that is triggered by Dependabot is automerged.  
In this context this action [uses itself](https://github.com/volkswagen/github-app-authentication-action/blob/main/.github/workflows/automerge.yml) to get the necessary token.  

### Testing environment

At least unit and integration tests must be executable on a local development environment.  
All levels of testing must be executed in GitHub actions.

### Entry and exit criteria

For starting the tests the repository needs to be pulled.  
At least the latest LTS version of Node.js must be present on the machine.  
Afterwards `npm install` and `npm run test` need to be performed.  

On commit multiple checks are automatically executed by Husky.  
If one of these checks fails, the commit is aborted.  

## Linting

As coding styles can be very different and we don't want this to be a meltingpot of styles a linter must check the code using common style guidelines.  
This repository uses eslint to ensure that linting is done and automatically fixed on every commit.  
The configurations and plugins of eslint can be found in the package.json.  

### Commit messages

Try to [write good and understandable commit messages](https://chris.beams.io/posts/git-commit/).  
For getting a faster overview we're trying to use [gitmoji](https://gitmoji.dev/) for this repository.  

## Dependency Management

Dependencies have the tendency to get out of date. In this way a process updating them automatically must be established.  
In this update process existing tests must be executed automatically to ensure the quality of the project.  
This repository is using Dependabot in combination with GitHub Actions for performing this job.  

### Software licenses

All dependecies must be checked for software license compliance and aligned to the repository license.  
In the case of a violation the dependency must not be used or accepted.  

On every change the licenses and transitive licenses of every dependencies are checked by an internal tool.  
This check will fail for non-permissive licenses.  
