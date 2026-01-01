import multer from "multer";
import path from "path";
import fs from "fs";
import axios from "axios";

const excelDir = "uploads/excel";

if (!fs.existsSync(excelDir)) {
  fs.mkdirSync(excelDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, excelDir);
  },
  filename: (_req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const normalizeImageUrl = (url: string) => {
  // Fix Unsplash URLs
  if (url.includes("images.unsplash.com") && !url.includes("?")) {
    return `${url}?auto=format&fit=crop&w=800&q=80`;
  }
  return url;
};

export const uploadExcel = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (_req, file, cb) => {
    if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only Excel (.xlsx) files allowed"));
    }
  },
});



export const downloadImage = async (
  imageUrl: string,
  folder: "products" | "banners"
): Promise<string> => {
  const ext = ".jpg"; // force jpg
  const filename = `${Date.now()}-${Math.round(
    Math.random() * 1e9
  )}${ext}`;

  const uploadDir = path.join("uploads", folder);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, filename);

  const response = await axios.get(imageUrl, {
    responseType: "stream",
    timeout: 10000,
  });

  const writer = fs.createWriteStream(filePath);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", () =>
      resolve(`/uploads/${folder}/${filename}`)
    );
    writer.on("error", reject);
  });
};