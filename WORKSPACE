workspace(name = "gobazel")

http_archive(
    name = "build_bazel_rules_typescript",
    # sha256 = "28c13760f8ca9d2edadda3e707a26bd99bd9e14670eb7e693808458ab1417c25",
    strip_prefix = "rules_typescript-0.20.3",
    url = "https://github.com/bazelbuild/rules_typescript/archive/0.20.3.zip",
)

http_archive(
    name = "bazel_toolchains",
    sha256 = "c3b08805602cd1d2b67ebe96407c1e8c6ed3d4ce55236ae2efe2f1948f38168d",
    strip_prefix = "bazel-toolchains-5124557861ebf4c0b67f98180bff1f8551e0b421",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/bazel-toolchains/archive/5124557861ebf4c0b67f98180bff1f8551e0b421.tar.gz",
        "https://github.com/bazelbuild/bazel-toolchains/archive/5124557861ebf4c0b67f98180bff1f8551e0b421.tar.gz",
    ],
)

# This commit matches the version of buildifier in angular/ngcontainer
# If you change this, also check if it matches the version in the angular/ngcontainer
# version in /.circleci/config.yml
BAZEL_BUILDTOOLS_VERSION = "49a6c199e3fbf5d94534b2771868677d3f9c6de9"

http_archive(
    name = "com_github_bazelbuild_buildtools",
    sha256 = "edf39af5fc257521e4af4c40829fffe8fba6d0ebff9f4dd69a6f8f1223ae047b",
    strip_prefix = "buildtools-%s" % BAZEL_BUILDTOOLS_VERSION,
    url = "https://github.com/bazelbuild/buildtools/archive/%s.zip" % BAZEL_BUILDTOOLS_VERSION,
)

# Fetching the Bazel source code allows us to compile the Skylark linter
http_archive(
    name = "io_bazel",
    sha256 = "ace8cced3b21e64a8fdad68508e9b0644201ec848ad583651719841d567fc66d",
    strip_prefix = "bazel-0.17.1",
    url = "https://github.com/bazelbuild/bazel/archive/0.17.1.zip",
)

http_archive(
    name = "io_bazel_skydoc",
    sha256 = "7bfb5545f59792a2745f2523b9eef363f9c3e7274791c030885e7069f8116016",
    strip_prefix = "skydoc-fe2e9f888d28e567fef62ec9d4a93c425526d701",
    # TODO: switch to upstream when https://github.com/bazelbuild/skydoc/pull/103 is merged
    url = "https://github.com/alexeagle/skydoc/archive/fe2e9f888d28e567fef62ec9d4a93c425526d701.zip",
)

http_archive(
    name = "grpc_ecosystem_grpc_gateway",
    strip_prefix = "grpc-gateway-1.5.1",
    url = "https://github.com/grpc-ecosystem/grpc-gateway/archive/v1.5.1.tar.gz",
)

# Load typescript dependencies
load("@build_bazel_rules_typescript//:package.bzl", "rules_typescript_dependencies")

rules_typescript_dependencies()



load("@bazel_gazelle//:deps.bzl", "go_repository")


# go_repository(
#     name = "com_github_golang_protobuf",
#     importpath = "github.com/golang/protobuf",
#     tag = "v1.2.0",
# )

# Also define in Gopkg.toml
go_repository(
    name = "org_golang_google_genproto",
    commit = "383e8b2c3b9e36c4076b235b32537292176bae20",
    importpath = "google.golang.org/genproto",
)

# Also define in Gopkg.toml
go_repository(
    name = "com_github_rogpeppe_fastuuid",
    commit = "6724a57986aff9bff1a1770e9347036def7c89f6",
    importpath = "github.com/rogpeppe/fastuuid",
)

# Also define in Gopkg.toml
go_repository(
    name = "com_github_go_resty_resty",
    commit = "f8815663de1e64d57cdd4ee9e2b2fa96977a030e",
    importpath = "github.com/go-resty/resty",
)

# Also define in Gopkg.toml
go_repository(
	name = "com_github_ghodss_yaml",
	commit = "0ca9ea5df5451ffdf184b4428c902747c2c11cd7",
	importpath = "github.com/ghodss/yaml",
)

# Also define in Gopkg.toml
go_repository(
	name = "in_gopkg_yaml_v2",
	commit = "eb3733d160e74a9c7e442f435eb3bea458e1d19f",
	importpath = "gopkg.in/yaml.v2",
)

# Load nodejs functions
load("@build_bazel_rules_nodejs//:defs.bzl", "check_bazel_version", "node_repositories")

check_bazel_version("0.17.0", """
If you are on a Mac and using Homebrew, there is a breaking change to the installation in Bazel 0.16
See https://blog.bazel.build/2018/08/22/bazel-homebrew.html
""")

node_repositories(
    node_version = "10.9.0",
    package_json = ["//:package.json"],
    preserve_symlinks = True,
    yarn_version = "1.9.2",
)

# Load golang dependencies, required by typescript (!)
load("@io_bazel_rules_go//go:def.bzl", "go_rules_dependencies", "go_register_toolchains")

go_rules_dependencies()

go_register_toolchains()

# Load golang build dependencies
load("@bazel_gazelle//:deps.bzl", "gazelle_dependencies")

gazelle_dependencies()

# Load and setup typescript dependencies
load("@build_bazel_rules_typescript//:defs.bzl", "ts_setup_workspace")

ts_setup_workspace()

# Load grpc_ecosystem_grpc_gateway dependencies
load("@grpc_ecosystem_grpc_gateway//:repositories.bzl", "repositories")

repositories()

load("@build_bazel_rules_nodejs//:defs.bzl", "node_repositories", "yarn_install", "npm_install")
node_repositories()

# Setup Bazel managed npm dependencies with the `yarn_install` rule.
# The name of this rule should be set to `npm` so that `ts_library` and `ts_web_test_suite`
# can find your npm dependencies by default in the `@npm` workspace. You may
# also use the `npm_install` rule with a `package-lock.json` file if you prefer.
# See https://github.com/bazelbuild/rules_nodejs#dependencies for more info.
npm_install(
  name = "npm",
  package_json = "//:package.json",
  package_lock_json = "//:package-lock.json",
)