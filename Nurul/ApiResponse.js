export class ApiResponse {
  constructor(statusCode, msg, data, meta = null) {
    this.statusCode = statusCode;
    this.msg = msg;
    this.data = data;
    this.success = this.statusCode >= 200 && this.statusCode < 300;
    this.timestamp = new Date().toISOString(); // Tambahan: waktu response ISO string
    if (meta) this.meta = meta; // Tambahan: metadata opsional (misal pagination info)
  }

  // Tambahan: static method sukses
  static success(data, msg = "Success", statusCode = 200, meta = null) {
    return new ApiResponse(statusCode, msg, data, meta);
  }

  // Tambahan: static method error
  static error(msg = "Error", statusCode = 500, data = null) {
    return new ApiResponse(statusCode, msg, data);
  }
}
