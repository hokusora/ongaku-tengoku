/**
 * Chức năng: Chuyển đổi định dạng Lyrics (LRC) sang định dạng JSON
 * @param {string} lrcText - Chuỗi chứa toàn bộ nội dung file LRC
 * @returns {Array} - Mảng các đối tượng JSON lời bài hát
 */
function convertLRCtoJSON(lrcText) {
  const lines = lrcText.split('\n');
  const lyricsArray = [];

  // Regex để tìm và trích xuất thẻ thời gian và lời bài hát
  // Ví dụ: [00:12.50]Nội dung -> ['[00:12.50]Nội dung', '00', '12', '50', 'Nội dung']
  const lrcRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/;

  lines.forEach(line => {
    // 1. Loại bỏ khoảng trắng đầu/cuối
    const trimmedLine = line.trim();
    if (!trimmedLine) return; // Bỏ qua các dòng trống

    const match = trimmedLine.match(lrcRegex);

    if (match) {
      // 2. Trích xuất các phần: phút, giây, mili giây, lời hát
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      let milliseconds = parseInt(match[3], 10);
      const text = match[4].trim(); // Nội dung lời bài hát

      // Xử lý mili giây (Nếu là .50 thì phải là .5, nếu là .500 thì phải là .5)
      // Chuyển 2 hoặc 3 chữ số mili giây thành phần thập phân
      if (match[3].length === 2) {
         milliseconds = milliseconds * 10; // Nếu là 50 (vd: .50) -> 500
      }
      
      // 3. Tính toán tổng thời gian theo giây
      // Ví dụ: [00:12.50] -> (0 * 60) + 12 + (500 / 1000) = 12.5
      const totalTime = minutes * 60 + seconds + (milliseconds / 1000);
      
      // 4. Thêm vào mảng JSON
      lyricsArray.push({
        time: parseFloat(totalTime.toFixed(2)), // Làm tròn 2 chữ số thập phân
        text: text || "..." // Nếu lời trống thì dùng "..."
      });
    }
  });

  return lyricsArray;
}