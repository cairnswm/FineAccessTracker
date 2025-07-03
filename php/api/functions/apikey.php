<?php

function decodeApiKey($guid)
{
  $parts = explode('-', $guid);
  if (count($parts) < 2) {
    throw new Exception("Invalid GUID format.");
  }

  $base = $parts[0];
  $encoded = $parts[1];

  $baseInt = hexdec($base);
  $encodedInt = hexdec($encoded);

  return $encodedInt - $baseInt;
}