module.exports = {
    branches: ["development"],
    repositoryUrl: "git@github.com:AmericanWhitewater/wh2o-vue.git",
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "@semantic-release/changelog",
        [
            "@semantic-release/github",
            {
                assets: [
                    {
                        path: "release.zip",
                        label: "Zip distribution"
                    }
                ]
            }
        ],
        "@semantic-release/npm",
        "@semantic-release/git"
    ]
}