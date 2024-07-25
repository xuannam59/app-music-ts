const fs = require("fs-extra");

const listFolderCopy = [
  {
    sourceDirectory: "views",
    targetDirectory: "dist/views"
  },
  {
    sourceDirectory: "public",
    targetDirectory: "dist/public"
  }
]

listFolderCopy.forEach(item => {
  fs.copy(item.sourceDirectory, item.targetDirectory, (error) => {
    if (error) {
      console.error(`Lỗi sao chép thư mục ${item.sourceDirectory}`, error);
    } else {
      console.error(`Thánh công sao chép thư mục ${item.sourceDirectory}`);
    }
  })
})