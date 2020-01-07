Vue.component("code-block", {
    props: ["model"],
    template:
        "<p>" +
        "    <label>Run code</label>" +
        "    <checkbox-field v-bind:model='model.runCode' v-bind:meta='model.runCode'></checkbox-field>" +
        "    <label>Language</label>" +
        "    <string-field v-bind:model='model.language' v-bind:meta='model.language'></string-field>" +
        "    <label>Filename</label>" +
        "    <string-field v-bind:model='model.filename' v-bind:meta='model.filename'></string-field>" +
        "    <label>Code</label>" +
        "    <text-field v-bind:model='model.rawCode' v-bind:meta='model.rawCode'></text-field>" +
        "</p>"
});