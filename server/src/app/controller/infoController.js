export const getListMonth = async (req, res) => {
  try {
    res.json({
      status: true,
      data: [
        { key: '202408', label: '202408' },
        { key: '202407', label: '202407' },
        { key: '202406', label: '202406' },
        { key: '202405', label: '202405' },
        { key: '202404', label: '202404' },
        { key: '202403', label: '202403' },
        { key: '202402', label: '202402' },
        { key: '202401', label: '202401' }
      ]
    });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
