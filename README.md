# NetBSD-UP 🚀

[![release](https://github.com/tsirysndr/netbsd-up/actions/workflows/release.yml/badge.svg)](https://github.com/tsirysndr/netbsd-up/actions/workflows/release.yml)
[![JSR](https://jsr.io/badges/@tsiry/netbsd-up)](https://jsr.io/@tsiry/netbsd-up)
[![deno module](https://shield.deno.dev/x/netbsdup)](https://deno.land/x/netbsdup)
![deno compatibility](https://shield.deno.dev/deno/^2.5.6)

A simple command-line tool to start NetBSD virtual machines using QEMU with
sensible defaults.

![Preview](./preview.png)

## ✨ Features

- 🖥️ **Easy NetBSD VM setup**: Launch NetBSD virtual machines with a single
  command
- 📥 **Automatic ISO download**: Downloads NetBSD ISO images from official CDN
- 🏷️ **Version-aware**: Specify NetBSD versions and automatically construct
  download URLs
- 🔄 **Flexible input**: Support for local ISO files, URLs, or version numbers
- ⚙️ **Configurable VM settings**: Customize CPU, memory, cores, and disk
  options
- ⚡ **KVM acceleration**: Automatically enables hardware virtualization for
  better performance
- 🌐 **Port forwarding**: Customizable port forwarding rules for network access
- 💻 **Serial console**: No GUI required - works entirely in terminal
- 🔧 **VM Management**: Start, stop, restart, inspect, remove, and list virtual
  machines
- 📊 **VM Logging**: Centralized logging with follow support for real-time
  monitoring
- 🔄 **Background execution**: Run VMs in detached mode for long-running tasks
- 💾 **Persistent storage**: SQLite database to track VM states and
  configurations
- 🏷️ **Auto-naming**: Automatic generation of unique VM names
- 🌉 **Bridge networking**: Support for custom network bridges

## 📋 Requirements

- 🦕 [Deno](https://deno.com/) runtime
- 🖥️ QEMU with KVM support
- 📥 `curl` for downloading ISO images

## 🚚 Installation

```bash
# Clone the repository
git clone https://github.com/tsirysndr/netbsd-up.git
cd netbsd-up

# Make it executable
chmod +x main.ts
```

Run the following command to install the CLI:

```bash
deno install -A -g -r -f jsr:@tsiry/netbsd-up
```

## 🎯 Usage

### ⭐ Basic Usage

Start a NetBSD 10.1 VM with default settings:

```bash
netbsd-up
```

### 🏷️ Specify NetBSD Version

```bash
netbsd-up 10.1
netbsd-up 9.3
```

### 📁 Use Local ISO File

```bash
netbsd-up /path/to/netbsd.iso
```

### 🌐 Download from Custom URL

```bash
netbsd-up https://cdn.netbsd.org/pub/NetBSD/images/10.1/NetBSD-10.1-amd64.iso
```

### 🔧 VM Management Commands

List all running VMs:

```bash
netbsd-up ps
```

List all VMs (including stopped):

```bash
netbsd-up ps --all
```

Start a stopped VM:

```bash
netbsd-up start <vm-name>
```

Start a VM in the background (detached):

```bash
netbsd-up start <vm-name> --detach
```

Stop a running VM:

```bash
netbsd-up stop <vm-name>
```

Restart a VM:

```bash
netbsd-up restart <vm-name>
```

Remove a VM:

```bash
netbsd-up rm <vm-name>
```

View VM logs:

```bash
netbsd-up logs <vm-name>
```

Follow VM logs in real-time:

```bash
netbsd-up logs <vm-name> --follow
```

Inspect VM details:

```bash
netbsd-up inspect <vm-name>
```

## 🖥️ Console Setup

When NetBSD boots, you'll see the boot menu. For the best experience with the
serial console:

1. **🔧 Select option `3. Drop to boot prompt`**
2. **⚙️ Configure console output:**
   ```
   consdev com0
   boot
   ```

This enables proper console redirection to your terminal.

### ⚙️ Advanced Configuration

```bash
# Custom CPU, memory, and cores
netbsd-up --cpu host --memory 4G --cpus 4

# Save downloaded ISO to specific location
netbsd-up --output netbsd-10.1.iso

# Use existing disk image
netbsd-up --image vm-disk.img --disk-format qcow2

# Run VM in the background
netbsd-up --detach

# Custom port forwarding (SSH on port 2222, HTTP on port 8080)
netbsd-up --port-forward "2222:22,8080:80"

# Combine multiple options
netbsd-up --memory 8G --cpus 4 --detach --port-forward "3000:3000"
```

## 🛠️ Command Line Options

| Option           | Short | Description                                                  | Default        |
| ---------------- | ----- | ------------------------------------------------------------ | -------------- |
| `--output`       | `-o`  | Output path for downloaded ISO                               | Auto-generated |
| `--cpu`          | `-c`  | CPU type to emulate                                          | `host`         |
| `--cpus`         | `-C`  | Number of CPU cores                                          | `2`            |
| `--memory`       | `-m`  | Amount of VM memory                                          | `2G`           |
| `--image`        | `-i`  | Path to VM disk image                                        | None           |
| `--disk-format`  |       | Disk image format                                            | `raw`          |
| `--size`         | `-s`  | Size of the disk image to create if it doesn't exist         | `20G`          |
| `--bridge`       | `-b`  | Name of the network bridge to use for networking (e.g., br0) | None           |
| `--detach`       | `-d`  | Run VM in the background and print VM name                   | `false`        |
| `--port-forward` | `-p`  | Port forwarding rules (format: hostPort:guestPort)           | None           |

## 🔧 VM Management Commands

| Command                     | Description                                      |
| --------------------------- | ------------------------------------------------ |
| `netbsd-up ps`              | List all running virtual machines                |
| `netbsd-up ps --all`        | List all virtual machines (including stopped)    |
| `netbsd-up start <name>`    | Start a stopped virtual machine                  |
| `netbsd-up start <name> -d` | Start a virtual machine in background (detached) |
| `netbsd-up stop <name>`     | Stop a running virtual machine                   |
| `netbsd-up restart <name>`  | Restart a virtual machine                        |
| `netbsd-up inspect <name>`  | Show detailed information about a VM             |
| `netbsd-up rm <name>`       | Remove a virtual machine from database           |
| `netbsd-up logs <name>`     | View logs for a virtual machine                  |
| `netbsd-up logs <name> -f`  | Follow logs in real-time                         |

## 📚 Examples

### ⭐ Default NetBSD VM

```bash
netbsd-up
```

Starts NetBSD 10.1 with 2 CPU cores and 2GB RAM.

### 🚀 High-Performance Setup

```bash
netbsd-up --cpus 8 --memory 8G --cpu host --detach
```

### 🌐 Custom Port Forwarding

```bash
# SSH on port 2222, web server on port 8080
netbsd-up --port-forward "2222:22,8080:80"

# Development setup with multiple ports
netbsd-up --port-forward "3000:3000,5432:5432" --detach
```

### 💾 Development Environment with Persistent Disk

```bash
# Create a disk image first
qemu-img create -f qcow2 netbsd-dev.qcow2 20G

# Start VM with the disk
./main.ts --image netbsd-dev.qcow2 --disk-format qcow2
```

### 🔢 Specific versions

```bash
netbsd-up 10.1
netbsd-up 9.4
```

### 🔄 Background Operations

```bash
# Start VM in background
netbsd-up --detach

# Start existing VM in background
netbsd-up start my-vm --detach

# Monitor VM logs
netbsd-up logs my-vm --follow
```

### 🔧 VM Management Examples

```bash
# List all running VMs
netbsd-up ps

# List all VMs including stopped ones
netbsd-up ps --all

# Start a specific VM by name
netbsd-up start my-netbsd-vm

# Start a VM in the background
netbsd-up start my-netbsd-vm --detach

# Stop a running VM
netbsd-up stop my-netbsd-vm

# Restart a VM
netbsd-up restart my-netbsd-vm

# Get detailed information about a VM
netbsd-up inspect my-netbsd-vm

# Remove a VM from the database
netbsd-up rm my-netbsd-vm

# View VM logs
netbsd-up logs my-netbsd-vm

# Follow VM logs in real-time
netbsd-up logs my-netbsd-vm --follow
```

## 🌐 Networking

The VM supports flexible networking configurations:

### 🔌 Default Networking

- 🌐 QEMU's user-mode networking (no special privileges required)
- 🔑 No default port forwarding (use `--port-forward` for specific needs)

### 🔧 Custom Port Forwarding

Use the `--port-forward` option to map host ports to guest ports:

```bash
# SSH access on port 2222
netbsd-up --port-forward "2222:22"

# Multiple port mappings
netbsd-up --port-forward "2222:22,8080:80,3000:3000"
```

### 🌉 Bridge Networking

For advanced networking, use bridge mode (requires sudo):

```bash
netbsd-up --bridge br0
```

## 📋 Version Format

NetBSD-UP recognizes version strings in the format:

- 🔢 `MAJOR.MINOR` (e.g., `10.1`, `9.3`)

⚡ The tool automatically constructs the download URL for the official NetBSD
release ISO.

## ⚙️ Default Settings

- **🏷️ NetBSD Version**: 10.1
- **🖥️ CPU**: host (uses host CPU features)
- **💾 Memory**: 2GB
- **⚡ CPU Cores**: 2
- **💿 Disk Format**: raw
- **💾 Disk Size**: 20GB (when creating new disk images)
- **🌐 Network**: User-mode with SSH forwarding
- **🏷️ VM Names**: Auto-generated unique names using random words

## 💾 Data Storage

NetBSD-UP uses a SQLite database (`~/.netbsd-up/state.sqlite`) to track virtual
machine states and configurations. The database stores:

- VM names and unique identifiers
- CPU, memory, and disk configurations
- Network settings (bridge, MAC addresses, port forwarding)
- Current status (RUNNING, STOPPED) with timestamps
- Creation and update timestamps
- Process IDs for running VMs
- Log file locations for each VM

### 📊 VM Logging

All VM output is automatically logged to `~/.netbsd-up/logs/<vm-name>.log`. You
can:

- View logs: `netbsd-up logs <vm-name>`
- Follow logs in real-time: `netbsd-up logs <vm-name> --follow`
- Access logs directly from the filesystem

## 📄 License

See [LICENSE](LICENSE) file for details.

## Contributing 🤝

Contributions are welcome! Please feel free to submit issues and pull requests.

> [!NOTE]
>
> This tool is designed for development and testing purposes. For production
> NetBSD deployments, consider using proper installation methods.
