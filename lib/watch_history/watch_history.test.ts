/*

import { describe, it, expect } from 'vitest';
//import { parseWatchHistory } from './watch_history';

describe('processWatchHistory', () => {
  it("TODO", () => {
    expect("a").toEqual("a")
  })
  
    const testHistory = `[
        {
            "header": "YouTube",
            "title": "Watched https://www.youtube.com/watch?v\\u003d8cyuOcb5O_M",
            "titleUrl": "https://www.youtube.com/watch?v\\u003d8cyuOcb5O_M",
            "time": "2023-12-01T04:04:37.799Z",
            "products": ["YouTube"],
            "activityControls": ["YouTube watch history"]
          },{
            "header": "YouTube Music",
            "title": "Watched https://music.youtube.com/watch?v\\u003dxfeys7Jfnx8",
            "titleUrl": "https://music.youtube.com/watch?v\\u003dxfeys7Jfnx8",
            "time": "2023-12-01T04:02:29.844Z",
            "products": ["YouTube"],
            "activityControls": ["YouTube watch history"]
          },{
            "header": "YouTube",
            "title": "Watched AJR - Steve\\u0027s Going To London (Visualizer)",
            "titleUrl": "https://www.youtube.com/watch?v\\u003dJc1_sv5odvI",
            "subtitles": [{
                "name": "AJR",
                "url": "https://www.youtube.com/channel/UCQ5w3fSomzziZfO7neK7eAg"
            }],
            "time": "2023-12-01T04:01:46Z",
            "products": ["YouTube"],
            "activityControls": ["YouTube watch history"]
          },{
            "header": "YouTube Music",
            "title": "Watched AJR - The Good Part (Official Video)",
            "titleUrl": "https://music.youtube.com/watch?v\\u003dhqrWXNMTaKY",
            "subtitles": [{
                "name": "AJR",
                "url": "https://www.youtube.com/channel/UCQ5w3fSomzziZfO7neK7eAg"
            }],
            "time": "2023-12-01T03:58:00.118Z",
            "products": ["YouTube"],
            "activityControls": ["YouTube watch history"]
        }
    ]`

    const data = [
      {"id": "8cyuOcb5O_M", "time": "2023-12-01T04:04:37.799Z"},
      {"id": "xfeys7Jfnx8", "time": "2023-12-01T04:02:29.844Z"},
      {"id": "Jc1_sv5odvI", "time": "2023-12-01T04:01:46Z"},
      {"id": "hqrWXNMTaKY", "time": "2023-12-01T03:58:00.118Z"}
    ]

	it('parses test data with both flag', () => {
		expect(parseWatchHistory(testHistory)).toStrictEqual(data);
	});

  it('it throws error if fails to parse JSON', () => {
    try {
      parseWatchHistory(`{
        [[[aasdasd
      }`)
    } catch (error: any) {
      expect(error.message).toEqual(`File Data is in an unexpected format. Try redownloading the file.`);
    }
  })

  it('throws error when wrong file format', () => {
    try {
      parseWatchHistory(`{
        "header": "YouTube",
        "title": "Watched https://www.youtube.com/watch?v\\u003d8cyuOcb5O_M",
        "titleUrl": "https://www.youtube.com/watch?v\\u003d8cyuOcb5O_M",
        "time": "2023-12-01T04:04:37.799Z",
        "products": ["YouTube"],
        "activityControls": ["YouTube watch history"]
      }`)
    } catch (error: any) {
      expect(error.message).toEqual(`File Data is in an unexpected format. Try redownloading the file.`);
    }
  })

  it('fails silently if an entry is in the wrong format', () => {
    expect(
      parseWatchHistory(`[[0]]`)
    ).toStrictEqual([])
  })

  it('fails silently if an entry fails regex', () => {
    expect(
      parseWatchHistory(`[{
        "header": "YouTube",
        "title": "Watched https://www.youtube.com/watch?v\\u003d8cyuOcb5O_M",
        "titleUrl": "https://www.yo8cyuOcb5O_M",
        "time": "2023-12-01T04:04:37.799Z",
        "products": ["YouTube"],
        "activityControls": ["YouTube watch history"]
      }]`)
    ).toStrictEqual([])
  })

  it('fails silently if an entry is missing keys', () => {
    expect(
      parseWatchHistory(`[{
        "header": "YouTube",
        "title": "Watched https://www.youtube.com/watch?v\\u003d8cyuOcb5O_M",
        "time": "2023-12-01T04:04:37.799Z",
        "products": ["YouTube"],
        "activityControls": ["YouTube watch history"]
      }]`)
    ).toStrictEqual([])

    expect(
      parseWatchHistory(`[{
        "header": "YouTube",
        "title": "Watched https://www.youtube.com/watch?v\\u003d8cyuOcb5O_M",
        "titleUrl": "https://www.youtube.com/watch?v\\u003d8cyuOcb5O_M",
        "products": ["YouTube"],
        "activityControls": ["YouTube watch history"]
      }]`)
    ).toStrictEqual([])
  })
  
});
*/
