git worktree list --porcelain | grep '^worktree ' | while read -r line; do
  dir=$(echo "$line" | cut -d' ' -f2)
  echo "Checking $dir"
  if git -C "$dir" status --porcelain | grep . >/dev/null; then
    echo "❌ $dir is not clean"
  else
    echo "✅ $dir is clean"
  fi
done

