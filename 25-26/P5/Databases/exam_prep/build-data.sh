#!/bin/bash
# Regenerate the inline JS data files from the JSON sources.
# Run this whenever data/questions.json or data/isubmit-exam.json changes.
set -e
cd "$(dirname "$0")"

python3 -c "
import json
for src, var, dst in [
    ('data/questions.json',   '__QUESTIONS_BANK', 'data/questions-data.js'),
    ('data/isubmit-exam.json','__ISUBMIT_EXAM',   'data/isubmit-exam-data.js'),
]:
    with open(src) as f: raw = f.read().rstrip()
    with open(dst, 'w') as f:
        f.write(f'window.{var} = {raw};\n')
    print(f'  wrote {dst}')
"
echo "Done."
