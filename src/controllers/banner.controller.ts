import { Request, Response } from "express";
import httpStatus from "http-status";
import Banner from "../models/banner.model";
import ApiError from "../utils/ApiError";

/**
 * CREATE BANNER (Admin)
 */
export const createBanner = async (req: Request, res: Response) => {
  const { title, link, isActive } = req.body;

  if (!req.file) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Banner image is required");
  }

  const banner = await Banner.create({
    title,
    link,
    isActive: isActive ?? true,
    image: `/uploads/banners/${req.file.filename}`,
  });

  res.status(httpStatus.CREATED).json({
    message: "Banner created successfully",
    banner,
  });
};

/**
 * GET ALL BANNERS (Public)
 */
export const getBanners = async (req: Request, res: Response) => {
  const banners = await Banner.find().sort({
    createdAt: -1,
  });

  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const formattedProducts = banners.map((p) => ({
    ...p.toObject(),
    image: `${baseUrl}${p.image}`,
  }));

  res.status(httpStatus.OK).json({
    count: formattedProducts.length,
    banners: formattedProducts,
  });
};

/**
 * GET SINGLE BANNER BY ID
 */
export const getBannerById = async (req: Request, res: Response) => {
  const banner = await Banner.findById(req.params.id);

  if (!banner) {
    throw new ApiError(httpStatus.NOT_FOUND, "Banner not found");
  }

  res.status(httpStatus.OK).json(banner);
};

/**
 * UPDATE BANNER (Admin)
 */
export const updateBanner = async (req: Request, res: Response) => {
  const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!banner) {
    throw new ApiError(httpStatus.NOT_FOUND, "Banner not found");
  }

  res.status(httpStatus.OK).json({
    message: "Banner updated successfully",
    banner,
  });
};

/**
 * DELETE BANNER (Admin)
 */
export const deleteBanner = async (req: Request, res: Response) => {
  const banner = await Banner.findByIdAndDelete(req.params.id);

  if (!banner) {
    throw new ApiError(httpStatus.NOT_FOUND, "Banner not found");
  }

  res.status(httpStatus.OK).json({
    message: "Banner deleted successfully",
  });
};

export const activateBanner = async (req: Request, res: Response) => {
  const banner = await Banner.findByIdAndUpdate(
    req.params.id,
    { isActive: true },
    { new: true }
  );

  if (!banner) {
    throw new ApiError(httpStatus.NOT_FOUND, "Banner not found");
  }

  res.status(httpStatus.OK).json({
    message: "Banner activated successfully",
    banner,
  });
};

export const deactivateBanner = async (req: Request, res: Response) => {
  const banner = await Banner.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );

  if (!banner) {
    throw new ApiError(httpStatus.NOT_FOUND, "Banner not found");
  }

  res.status(httpStatus.OK).json({
    message: "Banner deactivated successfully",
    banner,
  });
};
