<template>
  <div id="forgeViewer"></div>
</template>
<script>
/* global Autodesk:false */
import axios from "axios";

var viewerApp;
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
      }
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
      axios("/api/forge/oauth/token")
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
      viewerApp = new Autodesk.Viewing.ViewingApplication("forgeViewer");
      viewerApp.registerViewer(
        viewerApp.k3D,
        Autodesk.Viewing.Viewer3D //use Autodesk.Viewing.Private.GuiViewer3D for interface
      );
      this.loadDocument();
    },
    loadDocument() {
      viewerApp.loadDocument(
        this.documentId,
        this.onDocumentLoadSuccess,
        this.onDocumentLoadFailure
      );
    },
    onDocumentLoadSuccess(doc) {
      let modelNodes = viewerApp.bubble.search(av.BubbleNode.MODEL_NODE); // 3D designs
      let sheetNodes = viewerApp.bubble.search(av.BubbleNode.SHEET_NODE); // 2D designs
      this.$store.commit("docLoad", modelNodes.concat(sheetNodes));
      if (this.viewables.length === 0) {
        console.error("Document contains no viewables.");
        return;
      }
      this.selectItem(this.item);
    },
    selectItem(item) {
      viewerApp.selectItem(
        this.viewables[item].data,
        this.onItemLoadSuccess,
        this.onItemLoadFail
      );
    },
    onDocumentLoadFailure(viewerErrorCode) {
      console.error("onDocumentLoadFailure() - errorCode:" + viewerErrorCode);
    },
    onItemLoadSuccess(viewer, item) {
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
  height: 600px;
  margin: 0;
  background-color: #00f8ff;
}
</style>
