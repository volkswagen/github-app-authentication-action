# Contributing to GitHub App Authentication Action

Great that you want to help us to make the world a better place :+1:

The following is a set of guidelines for contributing to the GitHub App Authentication Action.
Mandatory guidelines are checked automatically on commit and in GitHub Actions.

# TLDR

The key points for you as a contributor:
- [Testing](#testing)
- [Commit messages](#commit-messages)


# Quality Concept

The following section describes how we want to ensure that this repository keeps or improves the quality over time.

## Coding

Try to follow the SOLID principles of [clean code](https://medium.com/mindorks/how-to-write-clean-code-lessons-learnt-from-the-clean-code-robert-c-martin-9ffc7aef870c).

## Testing

To ensure a constant quality and development speed all tests must be implemented and executed automatically.
In this context tests act as criteria for accepting a feature, which also prevents features from being changed or deleted without a test being red.
For getting a fast feedback tests must be run before commiting. For making sure that this really happens, GitHub Actions runs tests on every commit.
In general we would be really happy if you use [TDD](https://en.wikipedia.org/wiki/Test-driven_development) for your development.

In addition the [4-eyes principle](https://ec.europa.eu/eurostat/cros/content/four-eyes-principle_en) must be ensured and documented.
This is done by using Pull Requests or by using [Co-authored-by](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors) in maintainer pairing.

### Levels of Testing

In general features should be covered in three different ways:
- [Unit Testing](https://en.wikipedia.org/wiki/Unit_testing)
- [Integration Testing](https://en.wikipedia.org/wiki/Integration_testing)
- [End To End Testing](https://en.wikipedia.org/wiki/System_testing)

#### Unit Testing
This repository is using jest for unit testing. 
In addition a threshold is configured on test coverage to prevent a decrease over time.

#### Integration Testing
This repository consists of only one module, so there's nothing to integration test.

#### End To End Testing
Every commit that is triggered by Dependabot is automerged.
In this context this action [uses itself](https://github.com/volkswagen/github-app-authentication-action/blob/main/.github/workflows/automerge.yml) to get the necessary token.


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

All dependecies must be checked for software license compliance.  
In the case of a violation the dependency must not be used or accepted.  

On every change the licenses and transitive licenses of every dependencies are checked by an internal tool.  
This check will fail for non-permissive licenses.  
