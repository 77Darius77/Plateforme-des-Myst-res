import json

def handler(event, context):
    results = {}

    # Test 1 : import WeasyPrint
    try:
        from weasyprint import HTML
        results["import_weasyprint"] = "OK"
    except Exception as e:
        results["import_weasyprint"] = f"FAIL: {e}"
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps(results, ensure_ascii=False),
        }

    # Test 2 : génération d'un PDF minimal
    try:
        pdf_bytes = HTML(string="<h1>Test Numérologie</h1>").write_pdf()
        results["generate_pdf"] = f"OK — {len(pdf_bytes)} octets"
    except Exception as e:
        results["generate_pdf"] = f"FAIL: {e}"

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(results, ensure_ascii=False),
    }
