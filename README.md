# Nemesis

## Setting up for Android Envrionment

You need to clone it again - merging will take too much time and effort.

```
git clone

npm install

```

### Setting up Android Studio

If you don't have Android Studio installed, install it.

Open Android studios->tools->AVD Manager

[Connect a virtual device or usb debugging](https://stackoverflow.com/questions/48039119/com-android-builder-testing-api-deviceexception-no-connected-devices)

> Android Studio kept killing my emulator because of CPU usage(I think)
> and so I only have phone setup, all you need to do is allow USB-Debuggin and have it connected via usb to your phone - see link to activate developer mode.

Then

```
cd android && ./gradlew installDebug
```

This should work. If not, you need to have Java installed set the [permissions for kvm](https://stackoverflow.com/questions/37300811/android-studio-dev-kvm-device-permission-denied).

Finally, run

```
react-native link react-native-nfc-manager
```
