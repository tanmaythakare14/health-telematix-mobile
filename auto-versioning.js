import fs from 'fs';
import path from 'path';
import plist from 'plist';
import { logger } from './src/utils/SecureLogger.ts';
const incrementType = process.argv[2] || 'patch'; // Default to patch if no type is provided
const validTypes = ['patch', 'minor', 'major'];

if (!validTypes.includes(incrementType)) {
  logger.error(`Invalid increment type: ${incrementType}. Use 'patch', 'minor', or 'major'.`);
  process.exit(1);
}

// Helper to increment semantic versioning
const incrementVersion = (version, type) => {
  const [major, minor, patch] = version.split('.').map(Number);
  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      return version;
  }
};

// Paths
const packageJsonPath = path.resolve(__dirname, 'package.json');
const androidBuildGradlePath = path.resolve(__dirname, 'android', 'app', 'build.gradle');
const iosInfoPlistPath = path.resolve(__dirname, 'ios', 'template', 'Info.plist');

// Step 1: Update version in package.json
const updatePackageJsonVersion = () => {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const currentVersion = packageJson.version;
  const newVersion = incrementVersion(currentVersion, incrementType);

  packageJson.version = newVersion;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  logger.info(`Updated package.json version: ${currentVersion} -> ${newVersion}`);
  return newVersion;
};

// Step 2: Update version in Android build.gradle
const updateAndroidVersion = (newVersion) => {
  const gradleFile = fs.readFileSync(androidBuildGradlePath, 'utf8');
  const oldVersionCodeMatch = gradleFile.match(/versionCode (\d+)/);
  const oldVersionCode = oldVersionCodeMatch ? parseInt(oldVersionCodeMatch[1], 10) : null;
  const newVersionCode = oldVersionCode ? oldVersionCode + 1 : null;
  let updatedGradleFile = gradleFile.replace(/versionName "([\d.]+)"/, `versionName "${newVersion}"`);
  updatedGradleFile = gradleFile.replace(/versionCode (\d+)/, `versionCode ${newVersionCode}`);

  fs.writeFileSync(androidBuildGradlePath, updatedGradleFile);

  logger.info(`Updated Android versionCode in build.gradle: ${oldVersionCode} -> ${newVersionCode}`);

  logger.info(`Updated Android versionName in build.gradle: ${newVersion}`);
};

// Step 3: Update version in iOS Info.plist
const updateIOSVersion = (newVersion) => {
  const plistData = fs.readFileSync(iosInfoPlistPath, 'utf8');
  const plistObject = plist.parse(plistData);
  const currentVersion = plistObject.CFBundleShortVersionString;

  plistObject.CFBundleShortVersionString = newVersion;
  const updatedPlistData = plist.build(plistObject);
  fs.writeFileSync(iosInfoPlistPath, updatedPlistData);

  logger.info(`Updated iOS CFBundleShortVersionString in Info.plist: ${currentVersion} -> ${newVersion}`);
};

// Main
const newVersion = updatePackageJsonVersion();
updateAndroidVersion(newVersion);
updateIOSVersion(newVersion);

logger.info('App version updated successfully!');
