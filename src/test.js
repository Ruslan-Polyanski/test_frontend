import { getHash } from "./script";

function test(testName, callBack) {
  try {
    callBack();
    console.log(testName + ": " + "success");
  } catch (error) {
    console.log(testName + ": " + error);
  }
}

test("Функция getHash принимает hash", getHash);
