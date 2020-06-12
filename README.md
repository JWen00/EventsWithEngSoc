# Nemesis

Mobile app for NFC and Cam scanning.

Updates:

- HomeScreen is now a component with state
- Modal is multi-purpose, works for NFC, CAM, and Manual Input
- When phone scans card, modal shows with the ID
- `NFC` based off [example](https://github.com/whitedogg13/react-native-nfc-manager/blob/HEAD/example/AndroidMifareClassic.js)

Notes:

- If `npm install -g expo-cli` doesnt work, try `sudo npm install --unsafe-perm -g expo-cli`
- This package uses `react-native-nfc-manager` V1.2.2 - NOT the latest version.
- Current code only allows scanning whilst on homepage. \*\*
