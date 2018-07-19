<template>
  <div id="forgeViewer"></div>
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
        getAccessToken: this.getForgeToken
      },
      viewerApp: null
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
      this.viewerApp = new Autodesk.Viewing.ViewingApplication("forgeViewer");
      this.viewerApp.registerViewer(
        this.viewerApp.k3D,
        Autodesk.Viewing.Private.GuiViewer3D //use Autodesk.Viewing.Private.GuiViewer3D for interface
      );

      this.loadDocument();
    },
    loadDocument() {
      this.viewerApp.loadDocument(
        this.documentId,
        this.onDocumentLoadSuccess,
        this.onDocumentLoadFailure
      );
    },
    onDocumentLoadSuccess(doc) {
      let modelNodes = this.viewerApp.bubble.search(av.BubbleNode.MODEL_NODE); // 3D designs
      let sheetNodes = this.viewerApp.bubble.search(av.BubbleNode.SHEET_NODE); // 2D designs
      this.$store.commit("docLoad", modelNodes.concat(sheetNodes));
      if (this.viewables.length === 0) {
        console.error("Document contains no viewables.");
        return;
      }
      this.selectItem(this.item);
    },
    selectItem(item) {
      this.viewerApp.selectItem(
        this.viewables[item].data,
        this.onItemLoadSuccess,
        this.onItemLoadFail
      );
    },
    onDocumentLoadFailure(viewerErrorCode) {
      console.error("onDocumentLoadFailure() - errorCode:" + viewerErrorCode);
    },
    onItemLoadSuccess(viewer, item) {
      window.v = viewer;
      viewer.navigation.setReverseZoomDirection(true);
      console.log("Model loaded");
      console.log(item);
    },
    onItemLoadFail(errorCode) {
      console.error("onItemLoadFail() - errorCode:" + errorCode);
    }
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
