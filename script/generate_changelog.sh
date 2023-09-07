git --no-pager log --date=iso --pretty="format:%cI %H %s" > changelog
git add changelog
git commit -m "chore: updated changelog"