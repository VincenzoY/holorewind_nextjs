import { describe, it, expect } from 'vitest'
import { createRewind, RewindDataOptions } from '../rewind'
import { promises as fs } from 'fs'
import path from 'path'

describe('createRewind', () => {
  it('should generate rewind data from watch history file', async () => {
    // Read the test fixture
    const watchHistoryPath = path.join(__dirname, 'watch-history.json')
    const watchHistoryContent = await fs.readFile(watchHistoryPath, 'utf-8')

    // Create a mock File object
    const mockFile = {
      text: () => Promise.resolve(watchHistoryContent)
    } as File

    const options: RewindDataOptions = {
      year: 2025
    }

    const result = await createRewind(mockFile, options)

    // Snapshot test - the exact structure will depend on your data processing
    expect(result).toMatchSnapshot()

    // Basic structure tests
    expect(result).toBeDefined()
    expect(typeof result).toBe('object')
  })
})