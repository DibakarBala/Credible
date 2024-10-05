const mockTcpSocket = {
  createConnection: () => ({
    on: () => {},
    write: () => {},
    end: () => {},
  }),
  // Add other methods as needed
};

module.exports = mockTcpSocket;