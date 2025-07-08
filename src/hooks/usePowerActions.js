const { exec } = window.require('child_process');
const os = window.require('os');
 
function getPowerCommand(type) {
  const platform = os.platform();

  const commands = {
    shutdown: {
      win32: 'shutdown /s /t 0',
      darwin: "osascript -e 'tell app \"System Events\" to shut down'",
      linux: 'shutdown -h now'
    },
    restart: {
      win32: 'shutdown /r /t 0',
      darwin: "osascript -e 'tell app \"System Events\" to restart'",
      linux: 'shutdown -r now'
    },
    switchUser: {
      win32: 'tsdiscon',
      darwin: '/System/Library/CoreServices/Menu\\ Extras/User.menu/Contents/Resources/CGSession -suspend',
      linux: 'dm-tool switch-to-greeter'
    }
  };
 
  return commands[type]?.[platform];
}

export default function usePowerActions() {
  const runCommand = cmd => {
    if (!cmd) {
      console.error('Bu işlem bu platformda desteklenmiyor.');
      return;
    }
    exec(cmd, err => {
      if (err) {
        console.error('Power command failed:', err);
      }
    });
  };

  const handleShutdown = () => runCommand(getPowerCommand('shutdown'));
  const handleRestart = () => runCommand(getPowerCommand('restart'));
  const handleSwitchUser = () => runCommand(getPowerCommand('switchUser'));

  return { handleShutdown, handleRestart, handleSwitchUser };
}
