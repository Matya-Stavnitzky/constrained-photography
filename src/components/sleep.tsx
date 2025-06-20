function sleep(ms: number) {
  ms = ms * 1000; // Convert seconds to milliseconds
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default sleep; 