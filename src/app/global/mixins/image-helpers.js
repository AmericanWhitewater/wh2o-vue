export const imageHelpers = {
  methods: {
    formatAltText(image) {
      if (image.subject) {
        return image.subject;
      } else if (image.caption) {
        return image.caption;
      } else if (image.poi_name) {
        return image.poi_name;
      } else {
        return "Gallery Image";
      }
    },
    imageDate(image) {
      if (!image.photo_date) {
        return "n/a";
      }
      return this.formatDate(image.photo_date, "ll");
    },
    gaugeReading(image) {
      if (image.reading && image.metric && image.metric.unit) {
        return `${image.reading}${image.metric.unit}`;
      } else {
        return "n/a";
      }
    },
    formatFileSize(image) {
      if (image.image.file_size) {
        return this.formatBytes(image.image.file_size);
      } else {
        return "n/a";
      }
    },
    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return "0 Bytes";

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },
    sanitizedDescription(img) {
      if (img.description) {
        return this.$cleanContent(img.description);
      }
      return null;
    },
  }
}