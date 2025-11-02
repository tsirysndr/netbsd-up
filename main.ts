#!/usr/bin/env -S deno run --allow-run --allow-read --allow-env

import { Command } from "@cliffy/command";
import {
  createDriveImageIfNeeded,
  downloadIso,
  emptyDiskImage,
  handleInput,
  Options,
  runQemu,
} from "./utils.ts";

if (import.meta.main) {
  await new Command()
    .name("netbsd-up")
    .version("0.1.0")
    .description("Start a NetBSD virtual machine using QEMU")
    .arguments(
      "[path-or-url-to-iso-or-version:string]",
    )
    .option("-o, --output <path:string>", "Output path for downloaded ISO")
    .option("-c, --cpu <type:string>", "Type of CPU to emulate", {
      default: "host",
    })
    .option("-C, --cpus <number:number>", "Number of CPU cores", {
      default: 2,
    })
    .option("-m, --memory <size:string>", "Amount of memory for the VM", {
      default: "2G",
    })
    .option("-d, --drive <path:string>", "Path to VM disk image")
    .option(
      "--disk-format <format:string>",
      "Disk image format (e.g., qcow2, raw)",
      {
        default: "raw",
      },
    )
    .option(
      "-s, --size <size:string>",
      "Size of the disk image to create if it doesn't exist",
      {
        default: "20G",
      },
    )
    .example(
      "Default usage",
      "netbsd-up",
    )
    .example(
      "Specific version",
      "netbsd-up 10.1",
    )
    .example(
      "Local ISO file",
      "netbsd-up /path/to/netbsd.iso",
    )
    .example(
      "Download URL",
      "netbsd-up https://cdn.netbsd.org/pub/NetBSD/images/10.1/NetBSD-10.1-amd64.iso",
    )
    .action(async (options: Options, input?: string) => {
      const resolvedInput = handleInput(input);
      let isoPath: string | null = resolvedInput;

      if (
        resolvedInput.startsWith("https://") ||
        resolvedInput.startsWith("http://")
      ) {
        isoPath = await downloadIso(resolvedInput, options);
      }

      if (options.drive) {
        await createDriveImageIfNeeded(options);
      }

      if (!input && options.drive && !await emptyDiskImage(options.drive)) {
        isoPath = null;
      }

      await runQemu(isoPath, options);
    })
    .parse(Deno.args);
}
