const { exec } = window.require('child_process');
const os = window.require('os');

export default function usePowerActions() {
  const runCommand = cmd => {
    exec(cmd, err => {
      if (err) {
        console.error('Power command failed:', err);
      }
    });
  };

  const handleShutdown = () => {
    const platform = os.platform();
    let cmd;
    if (platform === 'win32') {
      cmd = 'shutdown /s /t 0';
    } else if (platform === 'darwin') {
      cmd = "osascript -e 'tell app \"System Events\" to shut down'";
    } else {
      cmd = 'shutdown -h now';
    }
    runCommand(cmd);
  };

  const handleRestart = () => {
    const platform = os.platform();
    let cmd;
    if (platform === 'win32') {
      cmd = 'shutdown /r /t 0';
    } else if (platform === 'darwin') {
      cmd = "osascript -e 'tell app \"System Events\" to restart'";
    } else {
      cmd = 'shutdown -r now';
    }
    runCommand(cmd);
  };

  const handleSwitchUser = () => {
    const platform = os.platform();
    let cmd;
    if (platform === 'win32') {
      cmd = 'tsdiscon';
    } else if (platform === 'darwin') {
      cmd = '/System/Library/CoreServices/Menu\\ Extras/User.menu/Contents/Resources/CGSession -suspend';
    } else {
      cmd = 'dm-tool switch-to-greeter';
    }
    runCommand(cmd);
  };

  return { handleShutdown, handleRestart, handleSwitchUser };
}
