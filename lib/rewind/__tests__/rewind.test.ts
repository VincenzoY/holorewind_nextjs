import { describe, it, expect } from 'vitest'
import { getRewindData, RewindDataOptions } from '../rewind'
import { promises as fs } from 'fs'
import path from 'path'

describe('getRewindData', () => {
  it('should generate rewind data from watch history file', async () => {
    // Read the test fixture
    const watchHistoryPath = path.join(__dirname, 'watch-history.json')
    const watchHistoryContent = await fs.readFile(watchHistoryPath, 'utf-8')

    // Create a mock File object
    const mockFile = {
      text: () => Promise.resolve(watchHistoryContent)
    } as File

    const mockFileList = [mockFile] as unknown as FileList

    const options: RewindDataOptions = {
      year: 2025,
      includedData: "all"
    }

    const result = await getRewindData(mockFileList, options)

    // Snapshot test - the exact structure will depend on your data processing
    expect(result).toMatchSnapshot()

    // Basic structure tests
    expect(result).toBeDefined()
    expect(typeof result).toBe('object')
  })

  it('should throw error when no files provided', async () => {
    const emptyFileList = [] as unknown as FileList
    const options: RewindDataOptions = {
      year: 2025,
      includedData: "all"
    }

    await expect(getRewindData(emptyFileList, options)).rejects.toThrow('No file found.')
  })
})