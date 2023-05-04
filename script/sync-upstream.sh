#!/bin/sh -l

set -eou pipefail

echo "[+] Action start"

if [ -n "${PAT:=}" ]
then
	GIT_CMD_REPOSITORY="https://planetscale:$PAT@github.com/$DESTINATION_REPOSITORY.git"
else
	echo "::error::PAT is empty"
	exit 1
fi


CLONE_DIR=$(mktemp -d)
trap 'rm -rf -- "$CLONE_DIR"' EXIT

echo "[+] Git version"
git --version

echo "[+] Cloning destination git repository"
git config --global user.email "operations+build@planetscale.com"
git config --global user.name "PlanetScale Actions Bot"

{
	git clone --single-branch --depth 1 --branch "$DESTINATION_BRANCH" "$GIT_CMD_REPOSITORY" "$CLONE_DIR"
} || {
	echo "::error::Could not clone the destination repository. Command:"
	echo "::error::git clone --single-branch --branch $DESTINATION_BRANCH $GIT_CMD_REPOSITORY $CLONE_DIR"
	exit 1

}
ls -la "$CLONE_DIR"

TEMP_DIR=$(mktemp -d)
trap 'rm -rf -- "$TEMP_DIR"' EXIT
mv "$CLONE_DIR/.git" "$TEMP_DIR/.git"

ABSOLUTE_DESTINATION_DIRECTORY="$CLONE_DIR/$DESTINATION_DIRECTORY/"

echo "[+] Clearing $ABSOLUTE_DESTINATION_DIRECTORY"
rm -rf "$ABSOLUTE_DESTINATION_DIRECTORY"
mkdir -p "$ABSOLUTE_DESTINATION_DIRECTORY"

echo "[+] Listing $PWD"
ls -al

echo "[+] Listing /"
ls -al /

mv "$TEMP_DIR/.git" "$CLONE_DIR/.git"

echo "[+] Listing $SOURCE_DIRECTORY"
ls "$SOURCE_DIRECTORY"

echo "[+] Checking if local $SOURCE_DIRECTORY exist"
if [ ! -d "$SOURCE_DIRECTORY" ]
then
	echo "ERROR: $SOURCE_DIRECTORY does not exist"
	exit 1
fi

echo "[+] Copying contents of source repository folder $SOURCE_DIRECTORY to folder $DESTINATION_DIRECTORY in git repo docs"
cp -a "$SOURCE_DIRECTORY"/. "$CLONE_DIR/$DESTINATION_DIRECTORY"
cd "$CLONE_DIR"

echo "[+] Files that will be pushed"
ls -la

echo "[+] Set $CLONE_DIR as safe directory"
# https://github.com/cpina/github-action-push-to-another-repository/issues/64
git config --global --add safe.directory "$CLONE_DIR"

echo "[+] Adding git files"
git add .

echo "[+] git status:"
git status

echo "[+] git diff-index:"
# git diff-index : to avoid doing the git commit failing if there are no changes to be commit
git diff-index --quiet HEAD || git commit --message 'docs: downstream' --message "https://github.com/$GITHUB_REPOSITORY/commit/$GITHUB_SHA" --message $'\nskip-checks: true' --cleanup=verbatim

echo "[+] Pushing git commit"
# --set-upstream: sets the branch when pushing to a branch that does not exist
git push "$GIT_CMD_REPOSITORY" --set-upstream "$DESTINATION_BRANCH"
