<template>
  <div id="forgeViewer" ref="forgeViewer"></div>
</template>
<script>
/* global Autodesk:false */
import axios from "axios";

export default {
  props: {
    documentId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      options: {
        env: "AutodeskProduction",
        api: 'derivativeV2',
        getAccessToken: this.getForgeToken
      },
      viewerApp: null,
      viewerDocument: null
    };
  },
  computed: {
    viewables() {
      return this.$store.state.viewer.viewables;
    },
    item() {
      return this.$store.state.viewer.itemIndex;
    }
  },
  created() {
    Autodesk.Viewing.Initializer(this.options, this.onInitialized);
  },
  watch: {
    documentId: "loadDocument",
    item: "selectItem"
  },
  methods: {
    getForgeToken(callback) {
      axios("https://us-central1-forge-vuer.cloudfunctions.net/credentials")
        .then(response => {
          let token = response.data.access_token;
          let expire = response.data.expires_in;
          callback(token, expire);
        })
        .catch(err => {
          console.error("Erro response: " + err);
        });
    },
    onInitialized() {
      console.log("initialized");
      this.viewerApp = new Autodesk.Viewing.GuiViewer3D(this.$refs.forgeViewer);
      this.viewerApp.start()

      this.loadDocument();
    },
    loadDocument() {
      Autodesk.Viewing.Document.load(
        this.documentId,
        this.onDocumentLoadSuccess,
        this.onDocumentLoadFailure
      );
    },
    onDocumentLoadSuccess(doc) {
      this.viewerDocument = doc
      let modelNodes = doc.getRoot().search({'type':'geometry'});
      //let sheetNodes = this.viewerApp.bubble.search(av.BubbleNode.SHEET_NODE); // 2D designs
      this.$store.commit("docLoad", modelNodes);
      if (this.viewables.length === 0) {
        console.error("Document contains no viewables.");
        return;
      }
      this.selectItem();
    },
    selectItem() {
      this.viewerApp.loadDocumentNode(
        this.viewerDocument, this.viewables[this.item]
      );
    },
    /* onDocumentLoadFailure(viewerErrorCode) {
      console.error("onDocumentLoadFailure() - errorCode:" + viewerErrorCode);
    },
    onItemLoadSuccess(viewer, item) {
      viewer.navigation.setReverseZoomDirection(true);
      console.log("Model loaded");
      console.log(item);
    },
    onItemLoadFail(errorCode) {
      console.error("onItemLoadFail() - errorCode:" + errorCode);
    } */
  },

  mounted() {}
};
</script>
<style>
#forgeViewer {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: #00f8ff;
}
</style>
