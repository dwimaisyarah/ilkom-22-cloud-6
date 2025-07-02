// This file processes data from sample.txt
const fs = require('fs');
const path = require('path');

// Define the path to the sample data file
const sampleDataPath = path.join(__dirname, '../data/sample.txt');

// Function to read the sample data file
function readSampleData() {
    return new Promise((resolve, reject) => {
        fs.readFile(sampleDataPath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
}

// Function to process the data
function processData(data) {
    // Example processing: split the data into lines
    const lines = data.split('\n');
    // Further processing can be done here
    return lines;
}

// Function to output the processed results
function outputResults(results) {
    console.log('Processed Results:');
    results.forEach((line, index) => {
        console.log(`${index + 1}: ${line}`);
    });
}

// Main function to execute the script
async function main() {
    try {
        const data = await readSampleData();
        const processedData = processData(data);
        outputResults(processedData);
    } catch (error) {
        console.error('Error processing the sample data:', error);
    }
}

// Run the main function
main();